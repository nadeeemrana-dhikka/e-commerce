import {
  IsString,
  IsEmail,
  IsPhoneNumber,IsStrongPassword,Length
} from "class-validator";
export class userRegisterDto {
  @IsString()@Length(3)
  name!: string;
  @IsEmail()
  email!: string;
  @IsPhoneNumber()
  phone!: string;
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1
  })
  @Length(8, 20)
  password!: string;
 
}

export class emailDto{
  @IsEmail()
  email!: string;
}

export class passwordDto{
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1
  })
  @Length(8, 20)
  password!: string;
}