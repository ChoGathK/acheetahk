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
exports.SysRuleRoles = void 0;
const typeorm_1 = require("typeorm");
const sys_role_1 = require("./sys_role");
const sys_rule_1 = require("./sys_rule");
const entity_common_1 = require("../entity.common");
// @Entity('sys_rule_roles')
class SysRuleRoles extends entity_common_1.CommonEntity {
}
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], SysRuleRoles.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('boolean', { default: false }),
    __metadata("design:type", Boolean)
], SysRuleRoles.prototype, "isDeleted", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], SysRuleRoles.prototype, "createTime", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], SysRuleRoles.prototype, "updateTime", void 0);
__decorate([
    typeorm_1.ManyToOne(() => sys_role_1.SysRole, (role) => role.sysRuleRoles),
    __metadata("design:type", sys_role_1.SysRole)
], SysRuleRoles.prototype, "role", void 0);
__decorate([
    typeorm_1.ManyToOne(() => sys_rule_1.SysRule, (rule) => rule.sysRuleRoles),
    __metadata("design:type", sys_rule_1.SysRule)
], SysRuleRoles.prototype, "rule", void 0);
exports.SysRuleRoles = SysRuleRoles;
//# sourceMappingURL=sys_role_rule.js.map