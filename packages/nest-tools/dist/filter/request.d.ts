import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { HttpCode, ErrorCode } from '..';
export declare class RequestFilter implements ExceptionFilter {
    private readonly logger;
    private readonly httpCode;
    private readonly errorCode;
    constructor(logger: any, httpCode: HttpCode, errorCode: ErrorCode);
    catch(exception: HttpException, host: ArgumentsHost): void;
}
