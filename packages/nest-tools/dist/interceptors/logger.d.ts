import { Observable } from 'rxjs';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
export declare class LoggerInterceptor implements NestInterceptor {
    private readonly logger;
    constructor(logger: any);
    intercept(ctx: ExecutionContext, next: CallHandler): Observable<any>;
}
