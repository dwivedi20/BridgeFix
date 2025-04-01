import {
  BadRequestException,
  Injectable,
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
import { ViewProfile } from 'src/dto/viewprofile.dto';
import { UpdateDTO } from 'src/dto/update.dto';
import { nanoid } from 'nanoid';
import { ResetToken } from 'src/schemas/resettoken.schema';
import { MailService } from 'src/email/nodemailer.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(ResetToken.name) private ResetTokenModel: Model<ResetToken>,
    private jwtServices: JwtService, private mailServices :MailService,
  ) {}

  async signUp(signupData: SignupDto): Promise<any> {
    const {
      employee_id,
      FirstName,
      LastName,
      email,
      password,
      Confirmpassword,
      Dateofbirth,
      Phonenumber,
      FatherName,
      MotherName,
      marital_status,
      SpouseName,
      Permanentaddress,
      Currentaddress,
      JoiningDate,
      Category,
      Department,
      Designation,
      Reporting_to,
      Totalexprience
    } = signupData;
    //
    if (
      !employee_id ||
      !FirstName ||
      !LastName ||
      !email ||
      !password ||
      !Confirmpassword ||
      !Dateofbirth ||
      !Phonenumber ||
      !FatherName ||
      !MotherName ||
      !marital_status ||
      !SpouseName ||
      !Permanentaddress ||
      !Currentaddress ||
      !JoiningDate ||
      !Category ||
      !Department ||
      !Designation ||
      !Reporting_to||
      !Totalexprience
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
      employee_id,
      FirstName,
      LastName,
      email,
      password: hashedpassword,
      Confirmpassword: hashedpassword,
      Dateofbirth,
      Phonenumber,
      FatherName,
      MotherName,
      marital_status,
      SpouseName,
      Permanentaddress,
      Currentaddress,
      Category,
      JoiningDate,
      Department,
      Designation,
      Reporting_to,
      Totalexprience
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
      { expiresIn: '30d' },
    );
    return {
      message: 'Login Successful',
      accessToken: accessToken,
    };
  }

  async userProfile(id: string): Promise<User> {
    const useremployee = await this.UserModel.findById(id).exec();
    if (!useremployee) {
      throw new NotFoundException();
    }
    return useremployee;
  }
  async updateProfile(id:string,updateUserDto:UpdateDTO):Promise<any>{
    const user = await this.UserModel.findByIdAndUpdate(id,updateUserDto,{new : true,

    });
    if (!user) {
      throw new NotFoundException('User missing');
    }
    return user
    
    
  }


  async userforgotpassword(email: string): Promise<any> {
    const forgot = await this.UserModel.findOne({ email: email });

    if (forgot) {
      const expireDate = new Date();
      expireDate.setHours(expireDate.getHours() + 1);
      const resettoken = nanoid(64);
      await this.ResetTokenModel.create({
        token: resettoken,
        userId: forgot._id,
        expireDate,
      });

       this.mailServices.sendPasswordResetEmail(email,resettoken)
    }
     return {message : "If this user exists, they will receive an email"}
  }
  async userresetpassword(newpassword:string, resetToken:string){
     
  }
}
