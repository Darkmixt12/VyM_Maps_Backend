import { Injectable } from '@nestjs/common';
import { CreateVentasDto } from './dto/create-ventas.dto';
import { UpdateGraphicDto } from './dto/update-graphic.dto';
import { Ventas } from './entities/ventas.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class GraphicsService {

  constructor(
    @InjectModel( Ventas.name) private ventasModel: Model<Ventas>,
  ){}
  create(createGraphicDto: CreateVentasDto) {
    return 'This action adds a new graphic';
  }

  findAll(): Promise<Ventas[]> {
    return this.ventasModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} graphic`;
  }

  update(id: number, updateGraphicDto: UpdateGraphicDto) {
    return `This action updates a #${id} graphic`;
  }

  remove(id: number) {
    return `This action removes a #${id} graphic`;
  }
}
