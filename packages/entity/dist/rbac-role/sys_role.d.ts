import { SysUserRoles } from './sys_user_roles';
import { CommonEntity } from '../entity.common';
export declare class SysRole extends CommonEntity {
    id: number;
    key: string;
    name: string;
    icon: string;
    roleInfo: string;
    isDisable: boolean;
    isDeleted: boolean;
    createTime: Date;
    updateTime: Date;
    /**
     * 一对多 关联角色映射表
     */
    map: SysUserRoles[];
}
