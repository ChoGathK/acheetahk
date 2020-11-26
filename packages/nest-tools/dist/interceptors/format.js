"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatInterceptor = void 0;
const operators_1 = require("rxjs/operators");
const common_1 = require("@nestjs/common");
const format = (data, response, requestId) => {
    return {
        code: response.statusCode === 200 ? 0 : response.statusCode,
        timestamp: Date.now(),
        message: 'success',
        requestId,
        data: data || null,
    };
};
let FormatInterceptor = class FormatInterceptor {
    intercept(ctx, next) {
        return next.handle().pipe(operators_1.map((responseData) => {
            const request = ctx.switchToHttp().getRequest();
            const response = ctx.switchToHttp().getResponse();
            const requestId = request.headers['x-api-request-id'] || null;
            if (responseData) {
                const { data, code, message, timestamp } = responseData;
                if (!data && !code && !message && !timestamp) {
                    return format(responseData, response, requestId);
                }
                return { requestId, code, message, timestamp, data };
            }
            return format(responseData, response, requestId);
        }));
    }
};
FormatInterceptor = __decorate([
    common_1.Injectable()
], FormatInterceptor);
exports.FormatInterceptor = FormatInterceptor;
