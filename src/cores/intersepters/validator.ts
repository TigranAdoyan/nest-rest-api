import { NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from "@nestjs/common";
import Joi, { object } from "joi";
import { map } from 'rxjs';

export class ValidatorIntersepter implements NestInterceptor {
    constructor (
         private readonly validator: Record<string, Record<string, Joi.ObjectSchema>>, 
    ) {}

    intercept(context: ExecutionContext, handler: CallHandler) {
        const request = context.switchToHttp().getRequest();
        const method = context.getHandler().name;
        if (this.validator[method]) {
            for (const [field, schema] of Object.entries(this.validator[method])) {
                const { error } = schema.validate(request[field])    
                if (error) throw new HttpException(error.details[0].message, HttpStatus.BAD_REQUEST);
            }
        }
        return handler.handle().pipe(map(data => {
            return data;
        }))
    }
}