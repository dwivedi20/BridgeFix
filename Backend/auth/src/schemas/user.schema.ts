import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose"





@Schema({
    timestamps: true,
})
export class User extends Document {
    @Prop({  })
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
    @Prop({ required: true ,type:Date,})
    Dateofbirth: Date;
    @Prop({ })
    Phonenumber: string;
    @Prop({  })
    FatherName: string;
    @Prop({})
    MotherName: string;
    @Prop({ })
     marital_status: string;
    @Prop({ })
     Bloodgroup: string;
     @Prop({  })
    SpouseName?: string;
    @Prop({  })
    Permanentaddress: string;
    @Prop({  })
    Currentaddress: string;
    @Prop({})
    JoiningDate: Date;
    @Prop({  })
    Category: string
    @Prop({  })
    Department: string;
    @Prop({ })
    Designation: string;
    @Prop({  })
    Reporting_to: string;
    @Prop({  })
    BankName: string;
    @Prop({ })
    BranchName: string;
    @Prop({})
    Accountnumber: number;
    @Prop({ })
    Accounttype: string;
    @Prop({})
    IFSCCODE:  string;
  @Prop({ required: false, type: Date, default: null })
   deletedAt?: Date; // Add soft delete field
}

export const UserSchema = SchemaFactory.createForClass(User)