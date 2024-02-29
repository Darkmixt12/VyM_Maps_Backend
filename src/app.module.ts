import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { LocationsModule } from './locations/locations.module';
import { GraphicsModule } from './graphics/graphics.module';
import { FilesModule } from './files/files.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot( process.env.MONGO_URI, { dbName: process.env.MONGO_DB_NAME}),
    AuthModule,
    LocationsModule,
    GraphicsModule,
    FilesModule],
  controllers: [],
  providers: [],

})
export class AppModule {

}
