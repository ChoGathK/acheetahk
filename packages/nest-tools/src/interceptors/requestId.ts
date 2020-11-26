import { Request } from 'express';
import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

import { getIp } from '../ip';

@Injectable()
export class RequestIdInterceptor implements NestInterceptor {

  constructor(
    private readonly logger: any,
  ) {}

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = ctx.switchToHttp().getRequest();

    const ip = getIp(request);
    const { originalUrl, method, headers } = request;
    const reqId = headers['x-api-request-id'] || uuid();

    request.headers['x-api-request-id'] = reqId;
    this.logger.info(`[Init Request ID] [${method}] ${originalUrl} ==> [${reqId}]`, ip);

    return next.handle().pipe((responseData: any) => responseData);
  }

}
