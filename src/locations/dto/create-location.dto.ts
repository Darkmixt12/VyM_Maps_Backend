import {IsArray, IsEmail, IsMobilePhone, IsString, MinLength,} from 'class-validator'

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

	@MinLength(8)
	@IsMobilePhone()
	telefono: number;

	@IsString()
	imagen?: string;

}
