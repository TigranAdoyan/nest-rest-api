import * as uuid from 'uuid';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { TokenService } from './token';
import * as Types from '../types.service';

const users: Types.User[] = []

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService
  ) { }

  signUp(props: Types.SignUpProps): string {
    users.push({
      id: uuid.v4() as string,
      username: props.username,
      email: props.email,
      password: props.password
    });
    return;
  }

  async signIn(props: Types.SignInProps): Promise<Types.SignInReturn> {
    const user = users.find(user => user.username == props.username && user.password == props.password);

    if (!user) throw new HttpException("username/password is wrong !", HttpStatus.BAD_REQUEST)

    const token = await this.tokenService.generateToken(user.id)

    return {
      token,
      user,
    }
  }

  signOut(): string {
    return 'sign out !';
  }

  getAccountInfo(): string {
    return 'get account info';
  }
}
