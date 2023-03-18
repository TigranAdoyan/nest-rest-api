import { Injectable, NestMiddleware } from "@nestjs/common";
import { AuthService } from '../../modules/auth/services/auth';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor (private readonly authService: AuthService) {}

    use(req: Request, res: Response, next: (error?: Error) => void) {
        console.log("saefsef")
        this.authService.authenticate({
            token: req.headers["x-auth-token"],
        });
        next();
    }
}