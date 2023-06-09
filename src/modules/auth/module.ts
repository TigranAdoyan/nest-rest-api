import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controller';
import { AuthService } from './services/auth';
import { AuthRedisProvider } from '../../providers/redis';
import { User } from '../../providers/mysql/entities/user.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: 'my-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController],
  providers: [AuthRedisProvider, AuthService],
  exports: [AuthService]
})

export class AuthModule {}
