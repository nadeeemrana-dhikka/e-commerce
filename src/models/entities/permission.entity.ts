import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { Role } from "./role.entity";
import { User } from "./user.entity";
import { UserHasPermissions } from "./user_has_permission.entity";

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToMany(() => Role, role => role.permissions)
  roles: Role[];

  @ManyToMany(() => UserHasPermission, userHasPermission => userHasPermission.permissions)
  userHasPermissions: UserHasPermission[];
}
