import { SysRuleRoles } from './sys_role_rule';
import { SysUserRoles } from './sys_user_roles';
import { CommonEntity } from '../entity.common';
export declare class SysRole extends CommonEntity {
    id: number;
    weight: number;
    key: string;
    name: string;
    icon: string;
    roleInfo: string;
    isDisable: boolean;
    isDeleted: boolean;
    createTime: Date;
    updateTime: Date;
    sysUserRoles: SysUserRoles[];
    sysRuleRoles: SysRuleRoles[];
}
