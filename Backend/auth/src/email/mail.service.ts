 
// import { ConfigService } from '@nestjs/config';
// import { JwtService } from '@nestjs/jwt';
// import { InjectModel } from '@nestjs/mongoose';
// import { User } from 'src/schemas/user.schema';
// import { Model } from 'mongoose';
// import * as nodemailer from 'nodemailer';

import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";


// export class mailservices {
//   nodemailerTransport: any
//   constructor(
//     @InjectModel(User.name) private UserModel: Model<User>,
//     private readonly configService: ConfigService,
//     private readonly JwtServices: JwtService,
//     private readonly mailservice : mailservices
    
//   ) {
//     this.nodemailerTransport = createTransporter({
//       host: 'smtp.gmail.com',
//       port: 465,
//       secure: true,
//       auth: {
//         user: configService.get('MY_EMAIL'),
//         pass: configService.get('MY_PASS'),
//       },
//     });
//   }
//   async sendResetpasswordLink(email: string): Promise<void> {
//     const payload = { email };
//     const token = this.JwtServices.sign(payload, {
//       secret: this.configService.get('JWT_SECRET'),
//       expiresIn: this.configService.get('1d'),
//     });

//     const user: any = this.UserModel.find((user) => user.email === email);
//     user.token = token;
//     const url = `${this.configService.get('CILENT_URL')}?token=${token}`;
//     const text = `Hi, \nTo reset your password,click here:${url}`;
//   }
// }

// function createTransporter(arg0: {}): any {
//   throw new Error('Function not implemented.');
// }
// this.nodemailerTransport = createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//         user: configService.get('EMAIL_USER'),
//         pass: configService.get('EMAIL_PASSWORD')
//     }
// });
// }

// private sendMail(options: Mail.Options) {
// this.logger.log('Email sent out to', options.to);
// return this.nodemailerTransport.sendMail(options);
// }
  export class mailservice{
    constructor(private readonly configService:ConfigService,
        private readonly jwtService :JwtService
        
      
    ){
        
    }
  }

