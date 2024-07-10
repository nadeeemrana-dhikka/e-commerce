import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  ManyToMany,JoinTable
} from "typeorm";
import { User } from "./user.entity";
import { Role } from "./role.entity";
import { Permission } from "./permission.entity";

@Entity()
export class UserHasPermissions {
  @PrimaryGeneratedColumn()
  id!: number;

  @JoinColumn()
  user!: User;

  @ManyToMany(() => Role, (role) => role.userHasPermissions)
  @JoinTable()
  roles!: Role[];

  @ManyToMany(() => Permission, (permission) => permission.userHasPermissions)
  @JoinTable()
  permissions!: Permission[];
}
