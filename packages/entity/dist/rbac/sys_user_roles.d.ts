import { SysRole } from './sys_role';
import { SysUser } from './sys_user';
import { CommonEntity } from '../entity.common';
export declare class SysUserRoles extends CommonEntity {
    id: number;
    isDeleted: boolean;
    createTime: Date;
    updateTime: Date;
    role: SysRole;
    user: SysUser;
}
