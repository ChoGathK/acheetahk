import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

import { SysRole } from './sys_role';
import { SysRule } from './sys_rule';
import { CommonEntity } from '../entity.common';

// @Entity('sys_rule_roles')

export class SysRuleRoles extends CommonEntity {

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
    (role) => role.sysRuleRoles,
  )
  role: SysRole;

  @ManyToOne(
    () => SysRule,
    (rule) => rule.sysRuleRoles,
  )
  rule: SysRule;

}
