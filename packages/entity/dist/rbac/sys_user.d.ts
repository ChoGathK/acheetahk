import { SysUserRoles } from './sys_user_roles';
import { CommonEntity } from '../entity.common';
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
    sysUserRoles: SysUserRoles[];
}
