import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controller';
import { AuthService } from './services/auth';
import { TokenService } from './services/token';
import { AuthRedisProvider } from '../../providers/redis';
import { AuthMiddleware } from '../../cores/middlewares/auth';

@Module({
  imports: [
    JwtModule.register({
      secret: 'my-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthRedisProvider, AuthService, TokenService],
  exports: [AuthService]
})

export class AuthModule implements NestModule { 
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
