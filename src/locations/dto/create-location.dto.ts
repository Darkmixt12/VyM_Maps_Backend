import {IsString, MinLength} from 'class-validator'

export class CreateLocationDto {

	@IsString()
	name:string;

	@IsString()
	provincia: string;

	@MinLength(6)
	description?: string;

	@IsString()
	agente: string;

	@IsString()
	ubicacion: string;

}
