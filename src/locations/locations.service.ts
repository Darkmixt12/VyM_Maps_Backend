import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location} from './entities/locations.entity'


@Injectable()
export class LocationsService {

  constructor(
    @InjectModel( Location.name ) private locationModel: Model<Location>,
  ){}
  
  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    try{ 

    const newLocation = new this.locationModel( createLocationDto );

    await newLocation.save()
    const location = newLocation.toJSON();
    return location

  } catch (error){
    if( error.code === 11000 ) {
      
      throw new BadRequestException( `El nombre ${ createLocationDto.title } ya ha sido ingresado con anterioridad` )
    }
    throw new InternalServerErrorException('Algo terrible ha ocurrido!!')
}
  }



  async register( createLocationDto: CreateLocationDto): Promise<CreateLocationDto>{

    const location =  await this.create(createLocationDto);

    return location
  }


    findAll(): Promise<Location[]> {
      return this.locationModel.find()
    }
  

  findOne(id: number) {
    return `This action returns a #${id} location`;
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    return `This action updates a #${id} location`;
  }

  remove(id: number) {
    return `This action removes a #${id} location`;
  }
}
