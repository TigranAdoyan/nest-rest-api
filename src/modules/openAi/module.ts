import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpenAiController } from './controller';
import { AuthRedisProvider } from '../../providers/redis';
import { AuthService } from '../auth/services/auth';
import { OpenAiService } from './services/openai';
import { User } from '../../providers/mysql/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'my-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [OpenAiController],
  providers: [AuthRedisProvider, AuthService, OpenAiService],
  exports: [AuthService]
})
export class OpenAiModule {}
