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




@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    
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
