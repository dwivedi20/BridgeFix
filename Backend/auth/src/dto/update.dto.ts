import { IsDate, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateDTO {
  @IsOptional()
  @IsString()
  FirstName?: string;
  @IsOptional()
  @IsString()
  LastName?: string;
  @IsOptional()
  @IsString()
   employee_id: string;
  @IsOptional()
  @IsEmail()
  email?: string;
  @IsOptional()
  @IsString()
  Phonenumber?: string;
  @IsOptional()
  @IsDate()
  Dateofbirth?: Date;
  @IsOptional()
  @IsString()
  FatherName?: string;
  @IsOptional()
  @IsString()
  MotherName?: string;
  @IsOptional()
  @IsString()
  marital_status?: string;
  @IsOptional()
  @IsString()
  SpouseName?: string;
  @IsOptional()
  @IsString()
  Permanentaddress?: string;
  @IsOptional()
  @IsString()
  Currentaddress?: string;
  @IsOptional()
  @IsDate()
  JoiningDate?: Date;
  @IsOptional()
  @IsDate()
  Totalexprience?: string;
  @IsOptional()
  @IsString()
  Category?: string;
  @IsOptional()
  @IsString()
  Department?: string;
  @IsOptional()
  @IsString()
  Designation?: string;
  @IsOptional()
  @IsString()
  Reporting_to?: string;
  @IsOptional()
  @IsString()
  BankName?: string;
  @IsOptional()
  @IsString()
  BranchName?: string;
  @IsOptional()
  @IsString()
  Accountnumber?: string;
  @IsOptional()
  @IsString()
  Accounttype?: string;
  @IsOptional()
  @IsString()
  IFSCCODE?: string;
}
