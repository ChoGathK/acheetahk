import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request, Response } from 'express';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

import { getIp } from '../ip';
import { ResponseArgs } from './types';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {

  constructor(
    private readonly logger: any,
  ) {}

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = ctx.switchToHttp().getRequest();
    const response: Response = ctx.switchToHttp().getResponse();

    const { originalUrl, body, query, method, headers } = request;

    const ip = getIp(request);
    const requestId = headers['x-api-request-id'] || null;

    return next.handle().pipe(
      map((responseData: ResponseArgs<any>) => {
        let value = `[Success] [${ctx.getClass().name}] [${method}] ${originalUrl} ==> [${response.statusCode}] \n`;

        value += `[Request] [ID]   ${requestId} \n`;
        value += `[Request] [Query]   ${JSON.stringify(query)} \n`;
        value += `[Request] [Body]    ${JSON.stringify(body)} \n`;
        value += `[Request] [Headers] ${JSON.stringify(headers)} \n`;
        value += `[Response] [Detail]  ${JSON.stringify(responseData)} \n`;

        if (request['user']) value += `\n [Request] [User] ${JSON.stringify(request['user'])} \n`;

        this.logger.info(value, ip);
        return responseData;
      }),
    );
  }
}
