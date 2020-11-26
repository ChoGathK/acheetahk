import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

import { SysRuleRoles } from './sys_role_rule';
import { CommonEntity } from '../entity.common';

// @Entity('sys_rule')

export class SysRule extends CommonEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column('int', { comment: 'Rule weight' })
  weight!: number;

  @Column('varchar', { length: 60, unique: true, comment: 'Rule key' })
  key!: string;

  @Column('varchar', { length: 60, unique: true, comment: 'Rule name' })
  name!: string;

  @Column('varchar', { length: 60, nullable: true, default: '', comment: 'Rule icon' })
  icon!: string;

  @Column('text', { nullable: true, default: '', comment: 'Rule information, reserved field' })
  ruleInfo!: string;

  @Column('boolean', { default: false, comment: 'Whether the rule is disabled' })
  isDisable!: boolean;

  @Column('boolean', { default: false })
  isDeleted!: boolean;

  @CreateDateColumn()
  createTime!: Date;

  @UpdateDateColumn()
  updateTime!: Date;

  // =================== connection relation =====================

  @OneToMany(
    () => SysRuleRoles,
    (sysRuleRoles) => sysRuleRoles.rule,
  )
  sysRuleRoles: SysRuleRoles[];

}
