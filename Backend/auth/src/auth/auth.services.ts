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
import  { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateDTO } from 'src/dto/update.dto';
import{LeaveBalance, LeaveSchema} from './../schemas/leave.schema';
import * as path from 'path';
import * as fs from 'fs';
import { Leave } from 'src/schemas/listholiday.schema';
import { CreateLeaveDTO } from 'src/dto/create_leave.dto';
import { UpdateLeaveDTO } from 'src/dto/update_leave.dto';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(LeaveBalance.name) private LeaveBalance: Model<LeaveBalance>,
    
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
    const AlreadyUser = await this.UserModel.findOne({
      email: signupData.email,
    });
    if (AlreadyUser) {
      throw new BadRequestException('User Already registerd');
    }
    // hashpassword
    const hashedpassword = await bcrypt.hash(password, 10);

    // create user document and save into database
    await this.UserModel.create({
  
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

    const user = await this.UserModel.findOne({ email });
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
    return this.UserModel.find().exec();
  }

  async userProfile(id: string): Promise<User> {
    const useremployee = await this.UserModel.findById(id).exec();

    if (!useremployee) {
      throw new NotFoundException();
    }
    return useremployee;
  }

//uploadimage
  async uploadImage(image:Express.Multer.File):Promise<any>{
    const uploadDir = path.join(__dirname, '..' , 'uploads');
    if(!fs.existsSync(uploadDir)){
      fs.mkdirSync(uploadDir);

      
      const filePath = path.join(uploadDir, image.originalname);
      await fs.writeFileSync(filePath, image.buffer); // Use buffer for in-memory files
      return { filename: image.originalname }

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

  async updateProfile(id: string, updateUserDto: UpdateDTO): Promise<any> {
    const user = await this.UserModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
    if (!user) {
      throw new NotFoundException('User missing');
    }
    return user;
  }


  async userforgotpassword(email: string): Promise<any> {
    const forgot = await this.UserModel.findOne({ email: email });
      console.log(forgot, "forgot");
    if (!forgot) {
      throw new NotFoundException(`User Not found ${email}`);
    }
    
      
  }

  async userresetpassword(newpass: string, token: string): Promise<any> {
    const existing = await this.UserModel.findOne({ token });
    if (!existing) {
      throw new BadRequestException('invaild or expire token');
    }
    const decode = this.jwtServices.verify(token, {
      secret: process.env.JWT_SECRET,
    });
    console.log(decode);
  }
  
 }
