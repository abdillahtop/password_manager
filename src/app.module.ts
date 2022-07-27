import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthMiddleware } from './middleware/auth.middleware';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { HealthController } from './modules/check.health/check.health.controller';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [HealthController],
  providers: [],
})

// export class AppModule { }
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: `/`, method: RequestMethod.GET }, { path: `/api`, method: RequestMethod.GET })
      .forRoutes('*');
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
