import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';



@Module({
  imports: [ 
        JwtModule.register({global:true, secret:'1234'}),
      MongooseModule.forRoot(`mongodb+srv://deepakdwivedi3211:jFFU8dRijNwGTy2Q@cluster0.jmn5mqz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`),
      AuthModule
  //   MongooseModule.forRootAsync({

  //   imports:[ConfigModule],
  //   useFactory:(ConfigService:ConfigService)=>{
  //     const envtype = ConfigService.get("NODE_ENV");
  //     const username = ConfigService.get("DATABASE_USER");
  //     const password = ConfigService.get("DATABASE_PASSWORD");
  //     const host     = ConfigService.get("DATABSE_HOST");
  //     const db       = ConfigService.get("DATABASE_NAME")
  //     const uri     =  `mongodb+srv://${username}:${password}@${host}/${db} ?retryWrites=true&w=majority&appName=Cluster0`;
  //     return{
  //       uri,
  //     }
  //   },
  //   inject:[ConfigService],
  // })
],

})
export class AppModule {}
