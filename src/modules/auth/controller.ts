import { Controller, Req, Request, HttpCode, Get, Post, Body, UseInterceptors, UseGuards } from '@nestjs/common';
import { SignUpReqBody, SignInReqBody } from './controller.types';
import { AuthService } from './services/auth';
import { ValidatorIntersepter } from '../../cores/intersepters/validator';
import { AuthMiddleware } from '../../cores/middlewares/auth';
import validator from './validation.schema';

@Controller("auth")
@UseInterceptors(new ValidatorIntersepter(validator))
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @HttpCode(200)
  @Post("sign-up")
  SignUp(@Body() body: SignUpReqBody) {
    return this.authService.signUp({
      username: body.username,
      email: body.email,
      password: body.password,
      age: body.age
    });
  }

  @HttpCode(200)
  @Post("sign-in")
  SignIn(@Body() body: SignInReqBody) {
    return this.authService.signIn({
      username: body.username,
      password: body.password
    });
  }

  @HttpCode(200)
  @Post("sign-out")
  SignOut(@Req() req: Request) {
    return this.authService.signOut({
      user: req.user
    });
  }

  @HttpCode(200)
  @Get("profile")
  Profile(@Req() req: Request) {
    return req.user;
  }
}
