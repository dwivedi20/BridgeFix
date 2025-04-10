import { IsNumber, IsString } from "class-validator";

 export class CreateLeaveDTO{
    @IsString()
    employee_id :string;
    @IsNumber()
    LossOfPay:number;
    @IsNumber()
    Comp_off:number;
    @IsNumber()
    EmergencyLeave:number;
    @IsNumber()
    EarnedLeave:number;
    @IsNumber()
    PaternityLeave:number;
    @IsNumber()
    RestrictedLeave:number;
    @IsNumber()
    SickLeave:number;
    @IsNumber()
    MaternityLeave : number;

}
