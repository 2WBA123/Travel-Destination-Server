import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Index,
  Equal,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import _ from 'lodash';
import { Permission } from './permission.entity';
import { Role } from './role.entity';
import { TimestampColumns } from './timestamp-columns';

export enum UserType {
  local = 'local',
  sso = 'SSO',
  office365 = 'Office365',
}

export enum UserStatus {
  active = 'active',
  Inactive = 'Inactive',
}

export var tempRole: string;

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Index({ unique: true })
  @Column()
  email: string;

  // @Column({
  //   type: 'enum',
  //   enum: UserType,
  //   nullable: true,
  // })
  // type: UserType;

  @Column()
  user_name: string;

  @Column({ nullable: true })
  password: string;

  @Column()
  first_name: string;

  @Column({ default: null })
  middle_name: string;

  @Column({ default: null })
  last_name: string;

  @Column({ default: null })
  time_zone: string;

  @Column({ default: null })
  phone: string;

  @Column({ default: null })
  profile_image: string;

  @Column(() => TimestampColumns, { prefix: '' })
  timestamps: TimestampColumns;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'user_has_permissions',
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'uuid',
    },
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'uuid',
    },
  })
  permissions: Permission[];

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_has_roles',
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'uuid',
    },
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'uuid',
    },
  })
  roles: Role[];

  static async getUserByEmail(email: string): Promise<User | null> {
    const found = await User.find({
      relations: ['roles', 'permissions'],
      where: { email: Equal(email) },
    });
    if (found.length === 1) return _.first(found);
    return null;
  }
}
