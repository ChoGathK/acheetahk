import { SysRole } from './sys_role';
import { SysRule } from './sys_rule';
import { CommonEntity } from '../entity.common';
export declare class SysRuleRoles extends CommonEntity {
    id: number;
    isDeleted: boolean;
    createTime: Date;
    updateTime: Date;
    role: SysRole;
    rule: SysRule;
}
