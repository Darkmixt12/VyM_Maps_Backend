import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GraphicsService } from './graphics.service';
import { CreateVentasDto } from './dto/create-ventas.dto';
import { UpdateGraphicDto } from './dto/update-graphic.dto';

@Controller('graphics')
export class GraphicsController {
  constructor(private readonly graphicsService: GraphicsService) {}

  @Post()
  create(@Body() createGraphicDto: CreateVentasDto) {
    console.log(createGraphicDto)
    return this.graphicsService.create(createGraphicDto);
  }

  @Get('/list')
  findAll() {
    return this.graphicsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.graphicsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGraphicDto: UpdateGraphicDto) {
    return this.graphicsService.update(+id, updateGraphicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.graphicsService.remove(+id);
  }
}
