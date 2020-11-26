import { CommonEntity } from '../entity.common';
import { SysUserRoles } from './sys_user_roles';
export declare class SysUser extends CommonEntity {
    id: number;
    phone: string;
    avatar: string;
    nickname: string;
    email: string;
    password: string;
    userInfo: string;
    isDisable: boolean;
    isDeleted: boolean;
    createTime: Date;
    updateTime: Date;
    /**
     * 一对多 关联角色映射表
     */
    map: SysUserRoles[];
}
