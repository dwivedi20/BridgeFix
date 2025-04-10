import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Number } from "mongoose";
import { EventType } from "src/schemas/listholiday.schema";
export class holidaylistDTO{
    @IsNotEmpty()
    @Type(()=>Number)
    @IsNumber()
    Year:number
    @IsNotEmpty()
    eventType:EventType
    @IsNotEmpty()
    @IsString()
    eventName: string;
    @IsNotEmpty()
    @Type(()=>Date)
    @IsDate()
    eventDate: Date;


 }