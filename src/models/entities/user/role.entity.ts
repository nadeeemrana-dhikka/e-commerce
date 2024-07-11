import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,DeleteDateColumn,
  CreateDateColumn,
  BaseEntity
} from 'typeorm';
import { User } from './user.entity';
import { Permission } from '../auth/permission.entity';

@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToMany(() => User, (user) => user.role)
  @JoinTable({ name: "user_has_roles" })
  users!: Role[]

  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable({ name: "role_has_permissions" })
  permissions!: Permission[]

  @Column({ unique: true })
  role!: string;

  @DeleteDateColumn({
    type: 'datetime'
  })
  deleted_at?: Date;

  @CreateDateColumn({
    type: 'datetime'
  })
  created_at?: Date;

  @CreateDateColumn({
    type: 'datetime',
  })
  updated_at?: Date;
}
