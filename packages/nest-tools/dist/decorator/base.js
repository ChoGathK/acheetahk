"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Headers = exports.IP = exports.User = void 0;
const common_1 = require("@nestjs/common");
const ip_1 = require("../ip");
exports.User = common_1.createParamDecorator((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request['user'];
});
exports.IP = common_1.createParamDecorator((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return ip_1.getIp(request);
});
exports.Headers = common_1.createParamDecorator((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers;
});
