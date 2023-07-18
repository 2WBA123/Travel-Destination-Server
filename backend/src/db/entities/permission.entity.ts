import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import _ from 'lodash';
import { TimestampColumns } from './timestamp-columns';

@Entity({ name: 'permissions' })
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column(() => TimestampColumns, { prefix: '' })
  timestamps: TimestampColumns;
}
