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
exports.SysUser = void 0;
const typeorm_1 = require("typeorm");
const sys_user_roles_1 = require("./sys_user_roles");
const entity_common_1 = require("../entity.common");
// @Entity('sys_user')
class SysUser extends entity_common_1.CommonEntity {
}
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], SysUser.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 60, unique: true, comment: 'User phone number' }),
    __metadata("design:type", String)
], SysUser.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true, default: '', comment: 'User Avatar' }),
    __metadata("design:type", String)
], SysUser.prototype, "avatar", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 60, nullable: true, default: '', comment: 'User nickname' }),
    __metadata("design:type", String)
], SysUser.prototype, "nickname", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 60, nullable: true, default: '', comment: 'User email' }),
    __metadata("design:type", String)
], SysUser.prototype, "email", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 60, nullable: true, default: '', comment: 'User password' }),
    __metadata("design:type", String)
], SysUser.prototype, "password", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true, default: '', comment: 'User information, reserved field' }),
    __metadata("design:type", String)
], SysUser.prototype, "userInfo", void 0);
__decorate([
    typeorm_1.Column('boolean', { default: false, comment: 'Whether the user is disabled' }),
    __metadata("design:type", Boolean)
], SysUser.prototype, "isDisable", void 0);
__decorate([
    typeorm_1.Column('boolean', { default: false }),
    __metadata("design:type", Boolean)
], SysUser.prototype, "isDeleted", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], SysUser.prototype, "createTime", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], SysUser.prototype, "updateTime", void 0);
__decorate([
    typeorm_1.OneToMany(() => sys_user_roles_1.SysUserRoles, (sysUserRoles) => sysUserRoles.user),
    __metadata("design:type", Array)
], SysUser.prototype, "sysUserRoles", void 0);
exports.SysUser = SysUser;
//# sourceMappingURL=sys_user.js.map