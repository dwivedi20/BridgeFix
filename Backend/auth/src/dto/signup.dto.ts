import { Transform } from 'class-transformer';
import { IsDate, IsEmail, IsEnum, IsString, Matches, MinLength } from 'class-validator';
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
  @Transform(({ value }) => new Date(value))  // Convert string to Date
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
  @Transform(({ value }) => new Date(value))  // Convert string to Date
  JoiningDate: Date;
  @IsString()
  Category: string;
  @IsString()
  Department: string;
  @IsString()
  Designation: string;
  @IsString()
  Reporting_to: string;
  @IsString()
  Totalexprience : string;

}
