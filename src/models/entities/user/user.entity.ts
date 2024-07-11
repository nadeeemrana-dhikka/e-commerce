import { Entity, Column, PrimaryGeneratedColumn, OneToOne,JoinColumn, BaseEntity, ManyToMany, JoinTable, DeleteDateColumn, CreateDateColumn} from "typeorm";
import { Role } from "./role.entity";
import { Permission } from "../auth/permission.entity";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({ name: "user_has_roles" })
  role!: Role[]

  @ManyToMany(() => Permission, (permission) => permission.users)
  @JoinTable({ name: "user_has_permissions" })
  permissions!: Permission[]

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  phone!: string;

  @Column()
  profile!: string;

  @Column()
  refreshToken!: string;
  
  @Column()
  status: number = 0; 

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