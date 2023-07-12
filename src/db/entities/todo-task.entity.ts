import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class TodoTask extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({nullable:true})
  fullName: string;

  @Column({nullable:true})
  email: string;

  @Column({nullable:true})
  contactNo: string;
}
