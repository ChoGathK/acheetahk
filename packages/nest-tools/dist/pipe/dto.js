"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DtoPipe = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const common_1 = require("@nestjs/common");
let DtoPipe = class DtoPipe {
    toValidate(metatype) {
        const types = [String, Boolean, Number, Array, Object];
        return !types.find((type) => metatype === type);
    }
    async transform(value, { metatype }) {
        if (!metatype || !this.toValidate(metatype))
            return value;
        const object = class_transformer_1.plainToClass(metatype, value);
        const errors = await class_validator_1.validate(object);
        if (errors.length > 0) {
            const messages = [];
            errors.forEach((e) => {
                if (e.constraints) {
                    Object.keys(e.constraints)
                        .forEach((info) => messages.push(e.constraints[info]));
                }
            });
            const errorMessage = messages.length > 0
                ? [...new Set(messages)].join(' , ')
                : 'Parameter error';
            throw new common_1.UnprocessableEntityException(errorMessage);
        }
        return value;
    }
};
DtoPipe = __decorate([
    common_1.Injectable()
], DtoPipe);
exports.DtoPipe = DtoPipe;
