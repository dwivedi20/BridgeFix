import { IsEmail, IsString } from "class-validator";

export class ForgotDTO{

    @IsEmail()
    email:string;


}