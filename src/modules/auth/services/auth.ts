import * as uuid from 'uuid';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { TokenService } from './token';
import { AuthRedisProvider } from '../../../providers/redis';
import * as Types from '../types.service';

const users: Types.User[] = []

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly authRedis: AuthRedisProvider,
  ) { }

  signUp(props: Types.SignUpProps) {
    users.push({
      id: uuid.v4() as string,
      username: props.username,
      email: props.email,
      password: props.password
    });

    return {
      success: true
    };
  }

  async signIn(props: Types.SignInProps): Promise<Types.SignInReturn> {
    const user = users.find(user => user.username == props.username && user.password == props.password);

    if (!user) throw new HttpException("username/password is wrong !", HttpStatus.BAD_REQUEST)
    const token = await this.tokenService.generateToken(user.id);
    this.authRedis.set(user.id, user);

    return {
      token,
      user,
    }
  }

  signOut(): string {
    return 'sign out !';
  }

  async authenticate(props: Types.AuthenticateProps) {
    const verifyToken = await this.tokenService.verifyToken(props.token);
    // @Todo to be continued
  }

  getAccountInfo(): string {
    return 'get account info';
  }
}
