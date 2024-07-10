import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Otp {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column()
  otp!: string;

  @Column('bigint')
  time!: number;
  @Column()
  isVerified: boolean = false;
}
