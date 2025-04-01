import {
  IsDate,
  IsEmail,
  IsEnum,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { MaritalStatus } from 'src/schemas/user.schema';

export class SignupDto {
  @IsString()
  employee_id: string;
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
  Dateofbirth: Date;
  @IsString()
  Phonenumber: string;
  @IsString()
  FatherName: string;
  @IsString()
  MotherName: string;
  @IsEnum(MaritalStatus)
  marital_status: MaritalStatus;
  @IsString()
  SpouseName?: string;

  @IsString()
  Permanentaddress: string;
  @IsString()
  Currentaddress: string;
  @IsDate()
  JoiningDate: Date;
  @IsString()
  Category: string;
  @IsString()
  Department: string;
  @IsString()
  Designation: string;
  @IsString()
  Reporting_to: string;
}
