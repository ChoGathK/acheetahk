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
exports.SysRole = void 0;
const typeorm_1 = require("typeorm");
const sys_user_roles_1 = require("./sys_user_roles");
const entity_common_1 = require("../entity.common");
let SysRole = class SysRole extends entity_common_1.CommonEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], SysRole.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 60, unique: true, comment: '角色索引' }),
    __metadata("design:type", String)
], SysRole.prototype, "key", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 60, unique: true, comment: '角色名' }),
    __metadata("design:type", String)
], SysRole.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 60, nullable: true, default: '', comment: '角色图标' }),
    __metadata("design:type", String)
], SysRole.prototype, "icon", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true, comment: '角色权限路由' }),
    __metadata("design:type", String)
], SysRole.prototype, "roleInfo", void 0);
__decorate([
    typeorm_1.Column('boolean', { default: false, comment: '角色是否被禁用' }),
    __metadata("design:type", Boolean)
], SysRole.prototype, "isDisable", void 0);
__decorate([
    typeorm_1.Column('boolean', { default: false }),
    __metadata("design:type", Boolean)
], SysRole.prototype, "isDeleted", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], SysRole.prototype, "createTime", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], SysRole.prototype, "updateTime", void 0);
__decorate([
    typeorm_1.OneToMany(() => sys_user_roles_1.SysUserRoles, (map) => map.role),
    __metadata("design:type", Array)
], SysRole.prototype, "map", void 0);
SysRole = __decorate([
    typeorm_1.Entity('sys_role')
], SysRole);
exports.SysRole = SysRole;
//# sourceMappingURL=sys_role.js.map