import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose"

@Schema({
    timestamps: true,
})
 export class LeaveBalance extends Document{
    @Prop({ required: true, unique: true,  }) 
    employee_id:string;
    @Prop({required:true,default:0})
    LossOfPay: number;
    @Prop({required:true,default:0})
    Comp_off:number;
    @Prop({required:true,default:0})
    EmergencyLeave : number;
    @Prop({required:true,default:0})
    EarnedLeave : number;
    @Prop({required:true,default:0})
    PaternityLeave:number;
    @Prop({required:true,default:0})
    RestrictedLeave:number;
    @Prop({required:true,default:0})
    SickLeave:number;
    @Prop({required:true,default:0})
    MaternityLeave : number;

}
export const LeaveSchema = SchemaFactory.createForClass(LeaveBalance)