import { IsEmail, IsString } from "class-validator";

 export class ViewProfile{
    @IsString()
    employee_id :string
    @IsString()
    FirstName: string
    @IsString()
    LastName:string
    @IsEmail()
    email:string
    @IsString()
    Phonenumber:string
    @IsString()
    Department:string
    @IsString()
    Designation:string
    @IsEmail()
    Reporting_to: string
    @IsString()
    Permanentaddress:string
    @IsString()
    Currentaddress:string
 }