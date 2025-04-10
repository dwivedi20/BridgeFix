import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose"

@Schema({
    timestamps: true,
})
 export class LeaveBalance extends Document{
    @Prop({ required: true, unique: true,  }) 
    employee_id:string;
    @Prop({required:true})
    LossOfPay: number;
    @Prop({required:true})
    Comp_off:number;
    @Prop({required:true})
    EmergencyLeave : number;
    @Prop({required:true})
    EarnedLeave : number;
    @Prop({required:true})
    PaternityLeave:number;
    @Prop({required:true})
    RestrictedLeave:number;
    @Prop({required:true})
    SickLeave:number;
    @Prop({required:true})
    MaternityLeave : number;

}
export const LeaveSchema = SchemaFactory.createForClass(LeaveBalance)