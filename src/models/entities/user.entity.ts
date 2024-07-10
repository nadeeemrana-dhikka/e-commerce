import { Entity, Column, PrimaryGeneratedColumn, OneToOne,JoinColumn} from "typeorm";
import { UserHasPermissions } from "./user_has_permission.entity";
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

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

  @OneToOne(() => UserHasPermissions , {cascade:true,onDelete: 'CASCADE',eager: true})
  @JoinColumn()
  Role!: UserHasPermissions;
  
  @Column()
  status: number = 0; 

}