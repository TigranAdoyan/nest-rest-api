import { Catch, ExceptionFilter, HttpException, ArgumentsHost } from '@nestjs/common';

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (process.env.ENVIRONMENT === "development") console.log(exception);

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const message = exception.message;
      response.status(status).json({
        message,
      });
    } else {
      response.status(500).json({
        message: 'Internal server error',
      });
    }
  }
}
