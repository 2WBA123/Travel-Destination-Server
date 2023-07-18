import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
  JoinTable,
  Index,
} from 'typeorm';
import _ from 'lodash';
import { Permission } from './permission.entity';
import { TimestampColumns } from './timestamp-columns';

export enum UserRole {
  user = 'user',
  admin = 'admin',
  super = 'super',
}

@Entity({ name: 'roles' })
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Index({ unique: true })
  @Column({
    type: 'enum',
    enum: UserRole,
  })
  name: UserRole;

  @Column({
    default: 'api',
  })
  guard: string;

  @Column(() => TimestampColumns, { prefix: '' })
  timestamps: TimestampColumns;

  @ManyToMany(() => Permission, { eager: true })
  @JoinTable({
    name: 'role_has_permissions',
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'uuid',
    },
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'uuid',
    },
  })
  permissions: Permission[];
}
