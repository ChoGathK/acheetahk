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
exports.RequestFilter = void 0;
const uuid_1 = require("uuid");
const common_1 = require("@nestjs/common");
const __1 = require("..");
let RequestFilter = class RequestFilter {
    constructor(logger, httpCode, errorCode) {
        this.logger = logger;
        this.httpCode = httpCode;
        this.errorCode = errorCode;
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const { originalUrl, body, query, method, headers } = request;
        const ip = __1.getIp(request);
        const requestId = headers['x-api-request-id'] || uuid_1.v4();
        const message = exception.message ? exception.message : 'InternalServerError';
        const statusCode = exception instanceof common_1.HttpException ? exception.getStatus() : 500;
        let code = 0;
        if (message in this.errorCode)
            code = this.errorCode[message];
        else if (statusCode in this.httpCode)
            code = this.httpCode[statusCode];
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
        if (request['user'])
            value += `\n [Request] [User] ${JSON.stringify(request['user'])} \n`;
        this.logger.error(value, ip);
        response.status(200);
        response.header('Content-Type', 'application/json; charset=utf-8');
        response.send(errorResponse);
    }
};
RequestFilter = __decorate([
    common_1.Catch(),
    __metadata("design:paramtypes", [Object, Object, Object])
], RequestFilter);
exports.RequestFilter = RequestFilter;
