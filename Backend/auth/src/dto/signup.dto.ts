import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';


export class SignupDto {
 
  @IsString()
  FirstName: string;
  @IsString()
  LastName: string;
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(8)
  password: string;
  @IsString()
  Confirmpassword: string;
  @IsDate()
  @Transform(({value})=>new Date(value))
  Dateofbirth:Date
  
  
}
