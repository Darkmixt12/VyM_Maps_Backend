import { Module } from '@nestjs/common';
import { GraphicsService } from './graphics.service';
import { GraphicsController } from './graphics.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ventas, VentasSchema } from './entities/ventas.entity';

@Module({
  controllers: [GraphicsController],
  providers: [GraphicsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Ventas.name,
        schema: VentasSchema
      }
    ])
  ]
})
export class GraphicsModule {}
