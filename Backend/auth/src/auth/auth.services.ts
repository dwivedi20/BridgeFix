import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SignupDto } from 'src/dto/signup.dto';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateDTO } from 'src/dto/update.dto';
import { LeaveBalance, LeaveSchema } from './../schemas/leave.schema';
import * as path from 'path';
import * as fs from 'fs';
// import { Leave } from 'src/schemas/listholiday.schema';
import { CreateLeaveDTO } from 'src/dto/create_leave.dto';
import { UpdateLeaveDTO } from 'src/dto/update_leave.dto';

import { LeaveList } from 'src/schemas/listholiday.schema';
// import { CreateDTO } from 'src/dto/create_leave.dto';
import { holidaylistDTO } from 'src/dto/holiday.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private User: Model<User>,
    @InjectModel(LeaveBalance.name) private LeaveBalance: Model<LeaveBalance>,
    @InjectModel(LeaveList.name) private LeaveList: Model<LeaveList>,

    private jwtServices: JwtService,
  ) {}

  async signUp(signupData: SignupDto): Promise<any> {
    const {
      FirstName,
      LastName,
      email,
      password,
      Confirmpassword,
      Dateofbirth,
    } = signupData;
    //
    if (
      !FirstName ||
      !LastName ||
      !email ||
      !password ||
      !Confirmpassword ||
      !Dateofbirth
    ) {
    }
    // User Already register
    const AlreadyUser = await this.User.findOne({
      email: signupData.email,
    });
    if (AlreadyUser) {
      throw new BadRequestException('User Already registerd');
    }
    // hashpassword
    const hashedpassword = await bcrypt.hash(password, 10);

    // create user document and save into database
    await this.User.create({
      FirstName,
      LastName,
      email,
      password: hashedpassword,
      Confirmpassword: hashedpassword,
      Dateofbirth,
    });
    return {
      message: 'User registered successfully',
    };
  }
  // login up
  // find if user existing emaill
  async Login(logindto: LoginDto): Promise<any> {
    const { email, password } = logindto;
    if (!email || !password) {
      throw new UnauthorizedException();
    }

    const user = await this.User.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invaild Credentials');
    }

    // compare password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Please provide  correct password');
    }

    const accessToken = this.jwtServices.sign(
      { id: user._id },
      { secret: '1234', expiresIn: '30d' }, // Merge into a single options object
    );

    return {
      message: 'Login Successful',
      accessToken: accessToken,
    };
  }
  async getuser(): Promise<User[]> {
    return this.User.find().exec();
  }

  async userProfile(id: string): Promise<User> {
    const useremployee = await this.User.findById(id).exec();

    if (!useremployee) {
      throw new NotFoundException();
    }
    return useremployee;
  }

  
  async uploadImage(image: Express.Multer.File): Promise<any> {
    const uploadDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);

      const filePath = path.join(uploadDir, image.originalname);
      await fs.writeFileSync(filePath, image.buffer); // Use buffer for in-memory files
      return { filename: image.originalname };
    }
  }

  //LeaveBalace Post

  async createLeave( leaveDto:CreateLeaveDTO):Promise<any>{
    const newLeave = new this.LeaveBalance(leaveDto)
    return newLeave.save()
   
   
  }

//LeaveBalance 

async getLeaveBalance(employee_id:string):Promise<any>{
  const LeaveBalance:LeaveBalance|null = await this.LeaveBalance.findOne({ employee_id});
  console.log(LeaveBalance,"---leave balnce")
  if (!LeaveBalance) {
    throw new NotFoundException('Employee leave balance not found');
  }

  return {
    employee_id: LeaveBalance?.employee_id,
    LossOfPay: LeaveBalance?.LossOfPay,
    Comp_off: LeaveBalance?.Comp_off,
    EmergencyLeave: LeaveBalance?.EmergencyLeave,
    EarnedLeave: LeaveBalance?.EarnedLeave,
    PaternityLeave: LeaveBalance?.PaternityLeave,
    RestrictedLeave: LeaveBalance?.RestrictedLeave,
    SickLeave: LeaveBalance?.SickLeave,
    MaternityLeave: LeaveBalance?.MaternityLeave,
    
  };
  
  
}

//update leave balance 
async updateByEmployeeId(employee_id:string, updateleaveDto:UpdateLeaveDTO):Promise<any>{
  const updateByEmployeeId = await this.LeaveBalance.findOneAndUpdate({employee_id:employee_id},updateleaveDto,{
    new:true,
  });
  if (!updateByEmployeeId) {
    throw new NotFoundException('error');
  }
  return updateByEmployeeId;
}


//updateprofile

  //updateprofile
  async updateProfile(id: string, updateUserDto: UpdateDTO): Promise<any> {
    const user = await this.User.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
    if (!user) {
      throw new NotFoundException('User missing');
    }
    return user;
  }


  async userforgotpassword(email: string): Promise<any> {
    const forgot = await this.User.findOne({ email: email });
    
    if (!forgot) {
      throw new NotFoundException(`User Not found ${email}`);
    }
    const token = this.jwtServices.sign({email},{secret:"1234",expiresIn: '30d'})
    const transporter = nodemailer.createTransport({
       host: 'smtp.gmail.com',
       port:  587,
      service: "gmail",
      secure:  false,
      auth: {
        user:process.env.MY_EMAIL,
        pass:process.env.MY_PASS,
      }
    });
    const receiver ={
       from : "dd533065@gmail.com",
       to: email,
       subject: 'reset password',
       html: `<p> Click <a href ="${process.env.CILENT_URL}/reset-password/${token}">  here </a>   on this link to generate your new password ,</p>`,
    }
    await transporter.sendMail(receiver)
     return{
         message: "password reset link sent to your email account"
     }
    
  }
  async userresetpassword(newpass: string, resetToken: string): Promise<any> {
    if(!newpass ||!resetToken){
       throw new NotFoundException('please fill newpassword or token')
    }
    const decode = this.jwtServices.verify(resetToken,{
      secret : "1234",})
    const user = await this.User.findById(decode.id)
    // console.log (user)

    if(!user){
      throw new Error("invaild or expire token");
    }
    const newhashpassword = await bcrypt.hash(newpass,10);
    user.password = newhashpassword
    await user.save()
    return {
      message: "password reset successfully"
    }
    
  }
  // create holiday by company
  async holidaycreate(holidaylistdto: holidaylistDTO): Promise<any> {
    const { Year, eventType, eventName, eventDate } = holidaylistdto;
    if (!Year || !eventType || !eventName || !eventDate) {
      throw new NotFoundException('please fill details');
    }
    await this.LeaveList.create(holidaylistdto);
    return {
      message: 'holiday created',
    };
  }
  async holidaygetemployee(Year: number): Promise<any> {
    return await this.LeaveList.find({ Year: Year });
  }
  async getUpcomingHolidays(): Promise<any> {
    const today = new Date();
    return this.LeaveList.find({ eventDate: { $gt: today } }).sort('eventDate');
  }

  async holidayprevious() {
    const today = new Date();
    return this.LeaveList.find({ eventDate: { $lt: today } }).sort(
      '-eventDate',
    );
  }

  async holidaydelete(id: string) {
    const holiday = await this.LeaveList.findByIdAndDelete(id);
    if (!holiday) {
      throw new NotFoundException('holiday not found');
    }
  }
   



}
