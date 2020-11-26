import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

import { SysRole } from './sys_role';
import { SysUser } from './sys_user';
import { CommonEntity } from '../entity.common';

// @Entity('sys_user_roles')

export class SysUserRoles extends CommonEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column('boolean', { default: false })
  isDeleted!: boolean;

  @CreateDateColumn()
  createTime!: Date;

  @UpdateDateColumn()
  updateTime!: Date;

  // =================== connection relation =====================

  @ManyToOne(
    () => SysRole,
    (role) => role.sysUserRoles,
  )
  role: SysRole;

  @ManyToOne(
    () => SysUser,
    (user) => user.sysUserRoles,
  )
  user: SysUser;

}
