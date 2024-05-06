import {IsArray, IsEmail, IsMobilePhone, IsNumber, IsOptional, IsString, MaxLength, MinLength,} from 'class-validator'

export class CreateLocationDto {

	@IsString()
	title:string;

	@IsString()
	provincia: string;

	@MinLength(6)
	description?: string;

	@IsString()
	agente: string;

	@IsArray()
	lngLat: string[];

	@IsEmail()
	email: string;

	@IsMobilePhone()
	@MaxLength(8)
	@MinLength(8)
	telefono?: string;

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
