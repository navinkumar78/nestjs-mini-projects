import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiResponse } from '../interfaces/api-response.interface';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ErrorInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      catchError((error) => {
        const startTime = Date.now();
        const executionTime = Date.now() - startTime;

        this.logger.error(
          `❌ Error in ${request.method} ${request.url}: ${error.message}`,
          error.stack,
        );

        // Handle different types of errors
        let statusCode: number;
        let message: string="an error occurred";
        let details: any;

        if (error instanceof HttpException) {
          statusCode = error.getStatus();
          const errorResponse = error.getResponse();
          
          if (typeof errorResponse === 'string') {
            message = errorResponse;
          } else if (typeof errorResponse === 'object') {
            message = (errorResponse as any).message || error.message;
            details = (errorResponse as any).details;
          }
        } else {
          // Handle MongoDB/Mongoose errors
          if (error.name === 'ValidationError') {
            statusCode = HttpStatus.BAD_REQUEST;
            message = 'Validation failed';
            details = Object.values(error.errors).map((err: any) => err.message);
          } else if (error.name === 'CastError') {
            statusCode = HttpStatus.BAD_REQUEST;
            message = 'Invalid ID format';
          } else if (error.code === 11000) {
            statusCode = HttpStatus.CONFLICT;
            message = 'Duplicate entry detected';
            details = 'A record with this information already exists';
          } else {
            statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            message = 'Internal server error';
            details = process.env.NODE_ENV === 'development' ? error.message : undefined;
          }
        }

        const errorResponse: ApiResponse = {
          success: false,
          message,
          data: details,
          timestamp: new Date().toISOString(),
          path: request.url,
          method: request.method,
          statusCode,
          executionTime,
        };

        response.status(statusCode).json(errorResponse);
        return throwError(() => error);
      }),
    );
  }
}