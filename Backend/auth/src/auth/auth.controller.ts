import { Body, Controller, Get, Param, Patch, Post, Put, Req, UseGuards } from "@nestjs/common";
import { SignupDto } from "src/dto/signup.dto";
import { AuthService } from "./auth.services";
import { LoginDto } from "src/dto/login.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { ViewProfile } from "src/dto/viewprofile.dto";
import { UpdateDTO } from "src/dto/update.dto";
import { ForgotDTO } from "src/dto/forgot.dto";
import { ResetPasswordDTO } from "src/dto/reset.dto";


 @Controller('/auth')
 export class AuthController{
 constructor(private readonly authServices:AuthService){}

 @Get('/protect')
 @UseGuards(AuthGuard)
 protectRoute(@Req() req){
    return{message:"Accessed Resource",user:req.user}
 }
// Signup
 @Post("/signup")

 async signup(@Body() signupDto: SignupDto){
    return await this.authServices.signUp(signupDto)
 }
// loginup
@Post("/login")
async login(@Body() logindto:LoginDto){
   return await this.authServices.Login(logindto)
}

// user is Get by Id
@Get(":id")
@UseGuards(AuthGuard)
  Getprofile(@Param("id") id:string){
    return this.authServices.userProfile(id)
}
// user is Update by Id
@Patch(':id')
@UseGuards(AuthGuard)
 async Profileupdate(@Param('id')id:string, @Body() updateDto:UpdateDTO){
    return this.authServices.userupdateProfile(id,updateDto)
 }
@Post("/forgot-password")
@UseGuards(AuthGuard)
async ForgotPassword(@Body()forgotDto:ForgotDTO){
    return this.authServices.userforgotpassword(forgotDto.email)
}
@Put("/reset-password")
@UseGuards(AuthGuard)
 async resetpassword(@Body()resetpassworddto:ResetPasswordDTO){
    return this.authServices.userresetpassword(
      resetpassworddto.newpass,
      resetpassworddto.resetToken,
    )
 }

}
