import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose"

// enum UserMaritalstatus{
//      Single,
//      Married,
//      Divorced,
//      Windowed
// }
export enum MaritalStatus {
    SINGLE = 'Single',
    MARRIED = 'Married',
    DIVORCED = 'Divorced',
    WIDOWED = 'Widowed',
  }

@Schema({
    timestamps: true,
})
export class User extends Document {
    @Prop({ required: true, unique: true, })
    employee_id: string;
    @Prop({ required: true ,})
    FirstName: string;
    @Prop({ required: true, })
    LastName: string;
    @Prop({ required: true ,})
    email: string;
    @Prop({ required: true, })
    password: string;
    @Prop({ required: true, })
    Confirmpassword: string;
    @Prop({ required: true })
    Dateofbirth: Date;
    @Prop({ required: true, unique:true, })
    Phonenumber: string;
    @Prop({ required: true })
    FatherName: string;
    @Prop({ required: true })
    MotherName: string;
    @Prop({ required: true, enum:MaritalStatus})
     marital_status: string;
    @Prop({ })
    SpouseName?: string;
    @Prop({ required: true, })
    Permanentaddress: string;
    @Prop({ required: true, })
    Currentaddress: string;
    @Prop({ required: true, })
    JoiningDate: Date;
    @Prop({ required: true })
    Category: string
    @Prop({ required: true, })
    Department: string;
    @Prop({ required: true, })
    Designation: string;
    @Prop({ required: true, })
    Reporting_to: string;
}
export const UserSchema = SchemaFactory.createForClass(User)