import { Request } from 'express';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { getIp } from '../ip';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return request['user'];
  },
);

export const IP = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return getIp(request);
  },
);

export const Headers = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return request.headers;
  },
);
