import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { NestFactory } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

import { AuthRedisProvider } from './providers/redis/index';

import { GlobalExceptionsFilter } from './cores/exeption/global';
import { DatabaseModule } from './providers/mysql/module';
import { AuthMiddleware } from './cores/middlewares/auth';
import { AuthModule } from './modules/auth/module';
import { OpenAiModule } from './modules/openai/module';

import { AuthService } from './modules/auth/services/auth';

import { entities } from './providers/mysql/entities'; 
 
@Module({
  imports: [
    AuthModule, 
    OpenAiModule,
    DatabaseModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root_user",
      password: "password",
      database: "durak", 
      entities: Object.values(entities),
      synchronize: false
    }),
    TypeOrmModule.forFeature([entities.User]),
    JwtModule.register({
      secret: 'my-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionsFilter,
    },
    AuthService,
    AuthRedisProvider
  ],
  exports: [AuthService]
})

class AppModule implements NestModule  {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .exclude(
      { path: "/auth/sign-up", method: RequestMethod.POST },
      { path: "/auth/sign-in", method: RequestMethod.POST },
      { path: "/openai/prompt", method: RequestMethod.POST }
    )
    .forRoutes('*');
  }
}

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionsFilter());
  await app.listen(process.env.SERVER_PORT);
}

bootstrap();
