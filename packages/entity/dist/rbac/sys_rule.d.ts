import { SysRuleRoles } from './sys_role_rule';
import { CommonEntity } from '../entity.common';
export declare class SysRule extends CommonEntity {
    id: number;
    weight: number;
    key: string;
    name: string;
    icon: string;
    ruleInfo: string;
    isDisable: boolean;
    isDeleted: boolean;
    createTime: Date;
    updateTime: Date;
    sysRuleRoles: SysRuleRoles[];
}
