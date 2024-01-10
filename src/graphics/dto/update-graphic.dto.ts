import { PartialType } from '@nestjs/mapped-types';
import { CreateVentasDto } from './create-ventas.dto';

export class UpdateGraphicDto extends PartialType(CreateVentasDto) {}
