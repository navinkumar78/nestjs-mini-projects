import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class PerformanceInterceptor implements NestInterceptor {
  private readonly logger = new Logger(PerformanceInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;
    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        const executionTime = Date.now() - startTime;
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;

        // Log performance metrics
        if (executionTime > 1000) {
          this.logger.warn(
            `⚠️  Slow Request: ${method} ${url} - ${executionTime}ms - Status: ${statusCode}`,
          );
        } else if (executionTime > 500) {
          this.logger.log(
            `🐌 Medium Request: ${method} ${url} - ${executionTime}ms - Status: ${statusCode}`,
          );
        } else {
          this.logger.log(
            `⚡ Fast Request: ${method} ${url} - ${executionTime}ms - Status: ${statusCode}`,
          );
        }

        // Add performance headers
        response.setHeader('X-Response-Time', `${executionTime}ms`);
        response.setHeader('X-Timestamp', new Date().toISOString());
      }),
    );
  }
}