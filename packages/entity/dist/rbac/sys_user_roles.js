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
exports.SysUserRoles = void 0;
const typeorm_1 = require("typeorm");
const sys_role_1 = require("./sys_role");
const sys_user_1 = require("./sys_user");
const entity_common_1 = require("../entity.common");
// @Entity('sys_user_roles')
class SysUserRoles extends entity_common_1.CommonEntity {
}
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], SysUserRoles.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('boolean', { default: false }),
    __metadata("design:type", Boolean)
], SysUserRoles.prototype, "isDeleted", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], SysUserRoles.prototype, "createTime", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], SysUserRoles.prototype, "updateTime", void 0);
__decorate([
    typeorm_1.ManyToOne(() => sys_role_1.SysRole, (role) => role.sysUserRoles),
    __metadata("design:type", sys_role_1.SysRole)
], SysUserRoles.prototype, "role", void 0);
__decorate([
    typeorm_1.ManyToOne(() => sys_user_1.SysUser, (user) => user.sysUserRoles),
    __metadata("design:type", sys_user_1.SysUser)
], SysUserRoles.prototype, "user", void 0);
exports.SysUserRoles = SysUserRoles;
//# sourceMappingURL=sys_user_roles.js.map