import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controller';
import { AuthService } from './services/auth';
import { TokenService } from './services/token';

@Module({
  imports: [
    JwtModule.register({
      secret: 'my-secret-key', 
      signOptions: { expiresIn: '1h' }, 
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService],
})
export class AuthModule {}
