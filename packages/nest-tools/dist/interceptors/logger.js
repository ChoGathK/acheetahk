"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerInterceptor = void 0;
const operators_1 = require("rxjs/operators");
const common_1 = require("@nestjs/common");
const ip_1 = require("../ip");
let LoggerInterceptor = class LoggerInterceptor {
    constructor(logger) {
        this.logger = logger;
    }
    intercept(ctx, next) {
        const request = ctx.switchToHttp().getRequest();
        const response = ctx.switchToHttp().getResponse();
        const { originalUrl, body, query, method, headers } = request;
        const ip = ip_1.getIp(request);
        const requestId = headers['x-api-request-id'] || null;
        return next.handle().pipe(operators_1.map((responseData) => {
            let value = `[Success] [${ctx.getClass().name}] [${method}] ${originalUrl} ==> [${response.statusCode}] \n`;
            value += `[Request] [ID]   ${requestId} \n`;
            value += `[Request] [Query]   ${JSON.stringify(query)} \n`;
            value += `[Request] [Body]    ${JSON.stringify(body)} \n`;
            value += `[Request] [Headers] ${JSON.stringify(headers)} \n`;
            value += `[Response] [Detail]  ${JSON.stringify(responseData)} \n`;
            if (request['user'])
                value += `\n [Request] [User] ${JSON.stringify(request['user'])} \n`;
            this.logger.info(value, ip);
            return responseData;
        }));
    }
};
LoggerInterceptor = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [Object])
], LoggerInterceptor);
exports.LoggerInterceptor = LoggerInterceptor;
