import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  DeleteDateColumn,
} from "typeorm";
import { Role } from "./role.entity";
import { UserHasPermissions } from "./user_has_permission.entity";

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  permission!: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles!: Role[];

  @ManyToMany(
    () => UserHasPermissions,
    (userHasPermissions) => userHasPermissions.permissions
  )
  userHasPermissions!: UserHasPermissions[];

  @DeleteDateColumn()
  deletedAt?: Date;
}
