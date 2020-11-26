import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

import { SysUserRoles } from './sys_user_roles';
import { CommonEntity } from '../entity.common';

// @Entity('sys_user')

export class SysUser extends CommonEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { length: 60, unique: true, comment: 'User phone number' })
  phone!: string;

  @Column('text', { nullable: true, default: '', comment: 'User Avatar' })
  avatar!: string;

  @Column('varchar', { length: 60, nullable: true, default: '', comment: 'User nickname' })
  nickname!: string;

  @Column('varchar', { length: 60, nullable: true, default: '', comment: 'User email' })
  email!: string;

  @Column('varchar', { length: 60, nullable: true, default: '', comment: 'User password' })
  password!: string;

  @Column('text', { nullable: true, default: '', comment: 'User information, reserved field' })
  userInfo!: string;

  @Column('boolean', { default: false, comment: 'Whether the user is disabled' })
  isDisable!: boolean;

  @Column('boolean', { default: false })
  isDeleted!: boolean;

  @CreateDateColumn()
  createTime!: Date;

  @UpdateDateColumn()
  updateTime!: Date;

  // =================== connection relation =====================

  @OneToMany(
    () => SysUserRoles,
    (sysUserRoles) => sysUserRoles.user,
  )
  sysUserRoles: SysUserRoles[];

}
