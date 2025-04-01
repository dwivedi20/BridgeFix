import { IsDate, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { MaritalStatus } from 'src/schemas/user.schema';

export class UpdateDTO {
  @IsOptional()
  @IsString()
  FirstName?: string;
  @IsOptional()
  @IsString()
  LastName?: string;
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
  @IsEnum(MaritalStatus)
  marital_status?: MaritalStatus;
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
}
