import { Injectable, NestMiddleware } from "@nestjs/common";
import { AuthService } from '../../modules/auth/services/auth';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor (private readonly authService: AuthService) {}

    async use(req: Request, res: Response, next: (error?: Error) => void) {
        req.user = await this.authService.authenticate({
            token: req.headers["x-auth-token"],
        });  
        console.log(req.user);
        next() 
    }
}