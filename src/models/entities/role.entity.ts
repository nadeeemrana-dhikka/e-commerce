import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Permission } from './permission.entity';
import { UserHasPermissions } from './user_has_permission.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  role!: string;

  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable()
  permissions!: Permission[];

  @ManyToMany(() => UserHasPermissions, (userHasPermissions) => userHasPermissions.roles)
  userHasPermissions!: UserHasPermissions[];
}
