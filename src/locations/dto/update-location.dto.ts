import { PartialType } from '@nestjs/mapped-types';
import { CreateLocationDto } from './create-location.dto';
import { IsArray, IsEmail, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

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

	@IsOptional()
	@IsNumber()
	telefono?: number;

	@IsString()
	@IsOptional()
	image?: string;

	@IsString()
	@IsOptional()
	whatsApp?: string;

	@IsString()
	@IsOptional()
	driveToLocation?: string

	@IsString()
	@IsOptional()
	facebook?: string

	@IsString()
	@IsOptional()
	twitter?: string

	@IsString()
	@IsOptional()
	instagram?: string

	@IsString()
	@IsOptional()
	webPage?: string

}
