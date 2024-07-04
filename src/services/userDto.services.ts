import {
  IsNumber,
  IsString,
  IsDateString,
  IsEmail,
  IsPhoneNumber,
} from "class-validator";
export class userRegisterDto {
  @IsString()
  name!: string;
  @IsEmail()
  email!: string;
  @IsPhoneNumber()
  phone!: string;
  @IsString()
  password!: string;
}
