import {IsArray, IsString, MinLength} from 'class-validator'

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

}
