import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  DeleteDateColumn,
  BaseEntity,
  JoinTable,
  CreateDateColumn,
} from "typeorm";
import { Role } from "../user/role.entity";
import { User } from "../user/user.entity";

@Entity()
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  permission!: string;

  @ManyToMany(() => User, (user) => user.permissions)
  @JoinTable({ name: "user_has_permissions" })
  users!: User[]

  @ManyToMany(() => Role, (role) => role.permissions)
  @JoinTable({ name: "role_has_permissions" })
  roles!: Role[]

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
