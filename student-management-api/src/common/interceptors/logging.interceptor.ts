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
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;
    const body = request.body ?? {};
    const query = request.query ?? {};
    const params = request.params ?? {};
    const userAgent = request.get('user-agent') || '';
    const ip = request.ip;

    this.logger.log(
      `📥 Incoming Request: ${method} ${url} - IP: ${ip} - User Agent: ${userAgent}`,
    );

    if (body && typeof body === 'object' && Object.keys(body).length > 0) {
      this.logger.log(`📦 Request Body: ${JSON.stringify(body)}`);
    }

    if (query && typeof query === 'object' && Object.keys(query).length > 0) {
      this.logger.log(`🔍 Query Params: ${JSON.stringify(query)}`);
    }

    if (params && typeof params === 'object' && Object.keys(params).length > 0) {
      this.logger.log(`🎯 Route Params: ${JSON.stringify(params)}`);
    }

    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const { statusCode } = response;
        const executionTime = Date.now() - now;

        this.logger.log(
          `📤 Outgoing Response: ${method} ${url} - Status: ${statusCode} - Time: ${executionTime}ms`,
        );
      }),
    );
  }
}
