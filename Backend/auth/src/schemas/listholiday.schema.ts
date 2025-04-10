import { Prop,  Schema,  SchemaFactory } from "@nestjs/mongoose";
import { Document,  } from 'mongoose';

export enum EventType{
GOVERMENTHOLIDAYS = 'GovermentalHolidays',
PERMANENT = 'Permanent',
RESTRICTED = 'Restricted',
}
@Schema({
    timestamps: true ,
})

export class LeaveList extends Document {
@Prop({required:true , })
   Year :number;
@Prop({required:true,})
   eventName: string;
@Prop({required:true,})
   eventDate: Date;
@Prop({required:true, })
    eventType: EventType;
 @Prop({  default: false })
   deletedAt?:  Boolean ;
}

export const HolidaySchema = SchemaFactory.createForClass(LeaveList);