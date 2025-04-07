import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps: true ,
})
export class Leave extends Document {
 @Prop({required:true ,})
   year :number;
 @Prop({required:true,})
   eventname: string;
@Prop({required:true, type:Date})
   eventdate: Date;
@Prop({required:true, enum:['Public', 'Company' ,'Optional']})
    eventType: string
}
export const Holiday = SchemaFactory.createForClass(Leave);