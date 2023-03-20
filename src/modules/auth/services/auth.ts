import * as uuid from 'uuid';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt';
import * as Types from './auth.types';
import { AuthRedisProvider } from '../../../providers/redis';
import { User } from '../../../providers/mysql/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authRedis: AuthRedisProvider,
    @InjectRepository(User) private userRepository: Repository<User>
  ) { }

  async signUp(props: Types.SignUpProps) {
    await this.userRepository.save(this.userRepository.create({
      username: props.username,
      password: props.password,
      email: props.email,
      age: props.age
    }));

    return {
      success: true
    };
  }

  async signIn(props: Types.SignInProps): Promise<Types.SignInReturn> {
    const user = await this.userRepository
      .createQueryBuilder("users")
      .where('BINARY users.username = :username', { username: props.username })
      .getOne();

    if (!user) throw new HttpException("username/password is wrong", HttpStatus.BAD_REQUEST)
    const token = await this.generateToken(user.id);
    this.authRedis.set(user.id.toString(), user);

    return {
      token,
      user,
    }
  }

  async signOut(props: Types.SignOutProps) {
    await this.authRedis.del(props.user.id.toString())

    return {
      success: true,
    };
  }

  async authenticate(props: Types.AuthenticateProps): Promise<User> {
    if (!props.token) throw new HttpException("authorization token is required", HttpStatus.UNAUTHORIZED);
    const { userId } = await this.verifyToken(props.token);
    const user = await this.authRedis.get<User>(userId);
    if (!user) throw new HttpException("authorization error. Please sign-in again", HttpStatus.UNAUTHORIZED);
    return user;
  }

  private async generateToken(userId: number): Promise<string> {
    return this.jwtService.signAsync({ userId });
  }

  private async verifyToken(token: string): Promise<any> {
    return this.jwtService.verifyAsync(token);
  }
}
