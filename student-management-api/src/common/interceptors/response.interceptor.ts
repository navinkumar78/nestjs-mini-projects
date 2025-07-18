import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../interfaces/api-response.interface';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const startTime = Date.now();

    return next.handle().pipe(
      map((data) => {
        const executionTime = Date.now() - startTime;
        const statusCode = response.statusCode;
        
        // Handle different response types
        let message: string;
        let responseData: T;

        if (data && typeof data === 'object' && 'message' in data && !Array.isArray(data)) {
          // If data already has a message property (like delete responses)
          message = data.message;
          responseData = data.data || data;
        } else {
          // Generate message based on HTTP method and status
          switch (request.method) {
            case 'POST':
              message = 'Resource created successfully';
              break;
            case 'GET':
              message = Array.isArray(data) 
                ? `Found ${data.length} record(s)` 
                : 'Resource retrieved successfully';
              break;
            case 'PATCH':
              message = 'Resource updated successfully';
              break;
            case 'DELETE':
              message = 'Resource deleted successfully';
              break;
            default:
              message = 'Operation completed successfully';
          }
          responseData = data;
        }

        return {
          success: statusCode >= 200 && statusCode < 300,
          message,
          data: responseData,
          timestamp: new Date().toISOString(),
          path: request.url,
          method: request.method,
          statusCode,
          executionTime,
        };
      }),
    );
  }
}