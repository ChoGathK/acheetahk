import { v4 as uuid } from 'uuid';
import { Request, Response } from 'express';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

import { getIp, HttpCode, ErrorCode } from '..';

@Catch()
export class RequestFilter implements ExceptionFilter {

  constructor(
    private readonly logger: any,
    private readonly httpCode: HttpCode,
    private readonly errorCode: ErrorCode,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request: Request = ctx.getRequest();
    const response: Response = ctx.getResponse();
    const { originalUrl, body, query, method, headers } = request;

    const ip = getIp(request);
    const requestId = headers['x-api-request-id'] || uuid();

    const message = exception.message ? exception.message : 'InternalServerError';
    const statusCode = exception instanceof HttpException ? exception.getStatus() : 500;

    let code = 0;
    if (message in this.errorCode) code = this.errorCode[message];
    else if (statusCode in this.httpCode) code = this.httpCode[statusCode];

    const errorResponse = {
      code,
      message,
      requestId,
      data: null,
      timestamp: Date.now(),
    };

    let value = `[Error] [${method}] ${originalUrl} ==> [${errorResponse.code}] \n`;
    value += `[Request] [ID]   ${requestId} \n`;
    value += `[Request] [Query]   ${JSON.stringify(query)} \n`;
    value += `[Request] [Body]    ${JSON.stringify(body)} \n`;
    value += `[Request] [Headers] ${JSON.stringify(headers)} \n`;
    value += `[Response] [Detail]  ${JSON.stringify(errorResponse)} \n`;
    if (request['user']) value += `\n [Request] [User] ${JSON.stringify(request['user'])} \n`;
    this.logger.error(value, ip);

    response.status(200);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }

}
