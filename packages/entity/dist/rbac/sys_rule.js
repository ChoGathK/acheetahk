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
exports.SysRule = void 0;
const typeorm_1 = require("typeorm");
const sys_role_rule_1 = require("./sys_role_rule");
const entity_common_1 = require("../entity.common");
// @Entity('sys_rule')
class SysRule extends entity_common_1.CommonEntity {
}
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], SysRule.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('int', { comment: 'Rule weight' }),
    __metadata("design:type", Number)
], SysRule.prototype, "weight", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 60, unique: true, comment: 'Rule key' }),
    __metadata("design:type", String)
], SysRule.prototype, "key", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 60, unique: true, comment: 'Rule name' }),
    __metadata("design:type", String)
], SysRule.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 60, nullable: true, default: '', comment: 'Rule icon' }),
    __metadata("design:type", String)
], SysRule.prototype, "icon", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true, default: '', comment: 'Rule information, reserved field' }),
    __metadata("design:type", String)
], SysRule.prototype, "ruleInfo", void 0);
__decorate([
    typeorm_1.Column('boolean', { default: false, comment: 'Whether the rule is disabled' }),
    __metadata("design:type", Boolean)
], SysRule.prototype, "isDisable", void 0);
__decorate([
    typeorm_1.Column('boolean', { default: false }),
    __metadata("design:type", Boolean)
], SysRule.prototype, "isDeleted", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], SysRule.prototype, "createTime", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], SysRule.prototype, "updateTime", void 0);
__decorate([
    typeorm_1.OneToMany(() => sys_role_rule_1.SysRuleRoles, (sysRuleRoles) => sysRuleRoles.rule),
    __metadata("design:type", Array)
], SysRule.prototype, "sysRuleRoles", void 0);
exports.SysRule = SysRule;
//# sourceMappingURL=sys_rule.js.map