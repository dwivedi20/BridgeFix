import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.services';
import { ResetToken, ResetTokenSchema } from 'src/schemas/resettoken.schema';
import { MailService } from 'src/email/nodemailer.service';


@Module({
    imports: [

        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema,
            },
            {
              name:ResetToken.name,
              schema :ResetTokenSchema,
            },
        ]),
    ],
    controllers: [AuthController],
    providers: [AuthService,MailService],
    exports: [AuthService],
})
export class AuthModule {

}
