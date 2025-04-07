import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}) , 
    JwtModule.register({ global: true, secret: '1234' }),
    MongooseModule.forRoot(
      `mongodb+srv://deepakdwivedi3211:jFFU8dRijNwGTy2Q@cluster0.jmn5mqz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    ),
    AuthModule,
  ],
})
export class AppModule {}
