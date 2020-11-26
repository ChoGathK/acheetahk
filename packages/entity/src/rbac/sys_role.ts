import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

import { SysRuleRoles } from './sys_role_rule';
import { SysUserRoles } from './sys_user_roles';
import { CommonEntity } from '../entity.common';

// @Entity('sys_role')

export class SysRole extends CommonEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column('int', { comment: 'Role weight' })
  weight!: number;

  @Column('varchar', { length: 60, unique: true, comment: 'Role key' })
  key!: string;

  @Column('varchar', { length: 60, unique: true, comment: 'Role name' })
  name!: string;

  @Column('varchar', { length: 60, nullable: true, default: '', comment: 'Role icon' })
  icon!: string;

  @Column('text', { nullable: true, default: '', comment: 'Role information, reserved field' })
  roleInfo!: string;

  @Column('boolean', { default: false, comment: 'Whether the role is disabled' })
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
    (sysUserRoles) => sysUserRoles.role,
  )
  sysUserRoles: SysUserRoles[];

  @OneToMany(
    () => SysRuleRoles,
    (sysRuleRoles) => sysRuleRoles.rule,
  )
  sysRuleRoles: SysRuleRoles[];

}
