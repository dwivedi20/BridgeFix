import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.services';
import { MulterModule } from '@nestjs/platform-express';
import { LeaveBalance, LeaveSchema } from 'src/schemas/leave.schema';
import { HolidaySchema, LeaveList } from 'src/schemas/listholiday.schema';


@Module({
    imports: [

        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema,
            },
            {
                name:LeaveBalance.name,
                schema:LeaveSchema,
            },
            {
                name: LeaveList.name,
                schema:HolidaySchema,
            }
        ]),
        MulterModule.register({
            dest: './uploads',
         }),

        
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}
