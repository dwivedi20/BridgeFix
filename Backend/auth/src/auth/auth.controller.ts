import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
  Delete,
  Res,
} from '@nestjs/common';
import { SignupDto } from 'src/dto/signup.dto';
import { AuthService } from './auth.services';
import { LoginDto } from 'src/dto/login.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { UpdateDTO } from 'src/dto/update.dto';
import { ForgotDTO } from 'src/dto/forgot.dto';
import { ResetPasswordDTO } from 'src/dto/reset.dto';
import { CreateLeaveDTO } from 'src/dto/create_leave.dto';
import { holidaylistDTO } from 'src/dto/holiday.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authServices: AuthService) {}
  // protect router using guard
  @Get('/protect')
  @UseGuards(AuthGuard)
  protectRoute(@Req() req) {
    return { message: 'Accessed Resource', user: req.user };
  }
  // Signup
  @Post('/signup')
  async signup(@Body() signupDto: SignupDto) {
    return await this.authServices.signUp(signupDto);
  }
  // loginup
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() logindto: LoginDto) {
    return await this.authServices.Login(logindto);
  }
  // forgotpassword
  @Post('/forgot-password')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async ForgotPassword(@Body() forgotDto: ForgotDTO) {
    return this.authServices.userforgotpassword(forgotDto.email);
  }
  // resetpassword
  @Put('/reset-password')
  @UseGuards(AuthGuard)
  async resetpassword(@Body() resetpassworddto: ResetPasswordDTO ) {
    return this.authServices.userresetpassword(
      resetpassworddto.newpass,
      resetpassworddto.resetToken,
    );
  }
  //All user is Get
  @Get('/Alluser')
  @HttpCode(HttpStatus.OK)
  async findall() {
    return this.authServices.getuser();
  }
  // user is Get our profile by Id
  @Get(':id')
  @UseGuards(AuthGuard)
  Getprofile(@Param('id') id: string) {
    return this.authServices.userProfile(id);
  }
  // user update our profile using id
  @Patch(':id')
  @UseGuards(AuthGuard)
  async updateProfile(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateDTO,
  ): Promise<any> {
    // Call the update method from the service
    return this.authServices.updateProfile(id, updateUserDto);
  }

  // Employee Leave Balance
 //  company post the total leave of our employee
  @Post('/leave')
  
  async createLeave(@Body() leaveDto: CreateLeaveDTO) {
    return await this.authServices.createLeave(leaveDto);
  }
  // employee get our leave provide by company using employee_id
  @Get('/employee/:employee_id')
  async getLeaveBalance(@Param('employee_id') employee_id: string) {
    const leaveBalance = await this.authServices.getLeaveBalance(employee_id);
    return {
      success: true,
      data: leaveBalance,
    };
  }

  //create holiday by company

  // company post total holiday provide our employee
  @Post('/createholiday')
  async createholiday(@Body() holidaylistdto: holidaylistDTO) {

    return this.authServices.holidaycreate(holidaylistdto);
  }
   // a Total holiday get by  Year
 @Get('/year/:year')
 @HttpCode(HttpStatus.OK)
 async getholiday(@Param('year')Year:number){
    return this.authServices.holidaygetemployee(Year)
 }
 // upcoming holiday
 @Get('/upcoming/holidays')
 @HttpCode(HttpStatus.OK)
 async upcomingholidays(){
  return this.authServices.getUpcomingHolidays()
 }
 // previous holiday
 @Get('/previous/holidays')
 async pastholiday(){
  return this.authServices.holidayprevious()
 }
 // holiday delete by id
@Delete(':id')
 async deleteholiday(@Param('id')id:string){
    return this.authServices.holidaydelete(id)
 }




}
