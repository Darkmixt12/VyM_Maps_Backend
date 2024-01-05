import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { LocationsModule } from './locations/locations.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot( process.env.MONGO_URI),
    AuthModule,
    LocationsModule],
  controllers: [],
  providers: [],

})
export class AppModule {

}
