import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { GlobalExceptionsFilter } from './cores/exeption/global';
import { AuthModule } from './modules/auth/module';
 
@Module({
  imports: [AuthModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionsFilter,
    },
  ]
})
class AppModule {}

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
