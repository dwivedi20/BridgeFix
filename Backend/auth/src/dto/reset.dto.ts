import { IsString } from "class-validator";

export class ResetPasswordDTO{
   @IsString() 
   resetToken : string;
   @IsString()
   newpasword : string;
}