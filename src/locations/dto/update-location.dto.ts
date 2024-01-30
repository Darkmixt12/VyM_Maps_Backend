import { PartialType } from '@nestjs/mapped-types';
import { CreateLocationDto } from './create-location.dto';
import { IsArray, IsEmail, IsMobilePhone, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateLocationDto extends PartialType(CreateLocationDto) {

	@IsString()
	@IsOptional()
	title?:string;

	@IsString()
	@IsOptional()
	provincia?: string;

	@IsOptional()
	description?: string;

	@IsString()
	@IsOptional()
	agente?: string;

	@IsArray()
	@IsOptional()
	lngLat?: string[];

	@IsEmail()
	@IsOptional()
	email?: string;

	@MinLength(8)
	@IsMobilePhone()
	@IsOptional()
	telefono?: number;

	@IsString()
	@IsOptional()
	imagen?: string;

}
