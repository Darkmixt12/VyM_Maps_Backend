import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Location, LocationSchema } from './entities/locations.entity';

@Module({
  controllers: [LocationsController],
  providers: [LocationsService],
  imports:[
    MongooseModule.forFeature([
      {
        name: Location.name,
        schema: LocationSchema
      }
    ])

  ]
})
export class LocationsModule {}