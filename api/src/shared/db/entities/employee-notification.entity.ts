import { text } from 'express';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CustomerEntity } from './customer';
import { EmployeeEntity } from './employee';
import { UserEntity } from './user';

@Entity('EmployeeNotifications')
export class EmployeeNotificationEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  itemId!: string;

  @Column({ default: false })
  isRead!: boolean;

  @Column()
  title!: string;

  @Column({ type: 'text' })
  message!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne((type) => EmployeeEntity, {
    nullable: true,
    lazy: true,
    onDelete: 'CASCADE',
  })
  employee!: Promise<EmployeeEntity>;
}
