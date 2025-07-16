import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { RateLimitMiddleware } from './middleware/rate-limit.middleware';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://NK14:pradhu1416@cluster0.cwvrlxh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    UserModule,
    ProductModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*')
      .apply(RateLimitMiddleware)
      .forRoutes('user', 'product');
  }
}
