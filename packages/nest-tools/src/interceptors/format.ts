import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request, Response } from 'express';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

import { ResponseArgs } from './types';

const format = (data, response, requestId) => {
  return {
    code: response.statusCode === 200 ? 0 : response.statusCode,
    timestamp: Date.now(),
    message: 'success',
    requestId,
    data: data || null,
  };
};

@Injectable()
export class FormatInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<ResponseArgs<any>> {
    return next.handle().pipe(
      map((responseData: ResponseArgs<any>) => {
        const request: Request = ctx.switchToHttp().getRequest();
        const response: Response = ctx.switchToHttp().getResponse();
        const requestId = (request.headers['x-api-request-id'] as string) || null;

        if (responseData) {
          const { data, code, message, timestamp } = responseData;

          if (!data && !code && !message && !timestamp) {
            return format(responseData, response, requestId);
          }

          return { requestId, code, message, timestamp, data };
        }

        return format(responseData, response, requestId);
      }),
    );
  }
}
