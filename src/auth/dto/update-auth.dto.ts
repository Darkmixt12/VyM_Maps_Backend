import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateAuthDto extends PartialType(CreateUserDto) {


	@IsOptional()
	@IsEmail()
	email?:string;

	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@MinLength(6)
	password?: string;
}
