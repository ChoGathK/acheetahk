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
exports.RequestIdInterceptor = void 0;
const uuid_1 = require("uuid");
const common_1 = require("@nestjs/common");
const ip_1 = require("../ip");
let RequestIdInterceptor = class RequestIdInterceptor {
    constructor(logger) {
        this.logger = logger;
    }
    intercept(ctx, next) {
        const request = ctx.switchToHttp().getRequest();
        const ip = ip_1.getIp(request);
        const { originalUrl, method, headers } = request;
        const reqId = headers['x-api-request-id'] || uuid_1.v4();
        request.headers['x-api-request-id'] = reqId;
        this.logger.info(`[Init Request ID] [${method}] ${originalUrl} ==> [${reqId}]`, ip);
        return next.handle().pipe((responseData) => responseData);
    }
};
RequestIdInterceptor = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [Object])
], RequestIdInterceptor);
exports.RequestIdInterceptor = RequestIdInterceptor;
