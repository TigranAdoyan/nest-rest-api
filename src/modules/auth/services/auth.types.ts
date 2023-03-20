import { User } from '../../../providers/mysql/entities/user.entity';

export type SignUpProps = {
  username: string;
  email: string;
  password: string;
  age: number;
}

export type SignInProps = {
  username: string;
  password: string;
}

export type SignInReturn = {
  token: string;
  user: User;
}

export type SignOutProps = {
  user: User;
}

export type AuthenticateProps = {
  token: string;
}