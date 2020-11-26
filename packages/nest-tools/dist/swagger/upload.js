"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiUpload = void 0;
const swagger_1 = require("@nestjs/swagger");
/**
 * swagger 文件上传组件
 */
const ApiUpload = (fileName = 'file') => (target, propertyKey, descriptor) => {
    swagger_1.ApiBody({
        type: 'multipart/form-data',
        required: true,
        schema: {
            type: 'object',
            properties: {
                [fileName]: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
        },
    })(target, propertyKey, descriptor);
};
exports.ApiUpload = ApiUpload;
