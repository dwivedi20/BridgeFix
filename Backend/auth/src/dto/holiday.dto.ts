import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

 export class holidaylist{
     @IsNumber()
     @IsNotEmpty()
     year : number;
     @IsEnum(['Public', 'Company' ,'Optional'])
    @IsNotEmpty()
    eventtype: string;
    @IsString()
    @IsNotEmpty()
    eventname: string;
    @IsDate()
    @IsNotEmpty()
    eventdate: Date;


 }