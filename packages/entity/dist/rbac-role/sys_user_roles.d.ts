import { SysRole } from './sys_role';
import { SysUser } from './sys_user';
import { CommonEntity } from '../entity.common';
export declare class SysUserRoles extends CommonEntity {
    id: number;
    isDeleted: boolean;
    createTime: Date;
    updateTime: Date;
    /**
     * 多对一 关联角色
     *
     * 多对一 关联管理员
     */
    role: SysRole;
    user: SysUser;
}
