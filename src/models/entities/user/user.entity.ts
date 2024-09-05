import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, DeleteDateColumn, CreateDateColumn, BaseEntity, UpdateDateColumn } from "typeorm";
import { Role } from "./role.entity";
import { Permission } from "./permission.entity";
import { Order } from "../orders/order.entity";
@Entity({
  name: "users"
})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({ name: "user_has_roles" })
  roles!: Role[];

  @ManyToMany(() => Permission, (permission) => permission.users)
  @JoinTable({ name: "user_has_permissions" })
  permissions!: Permission[];

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];

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

  @Column({ type: 'varchar', length: 255 })
  refreshToken: string = "";

  @Column({ default: 0 })
  status!: number;

  @DeleteDateColumn({
    type: 'datetime'
  })
  deleted_at?: Date;

  @CreateDateColumn({
    type: 'datetime'
  })
  created_at?: Date;

  @UpdateDateColumn({
    type: 'datetime'
  })
  updated_at?: Date;
}


