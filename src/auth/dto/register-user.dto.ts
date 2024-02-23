import { IsEmail, IsString, MinLength} from 'class-validator';

export class RegisterDto {

	@IsEmail()
	email: string;

	@MinLength(6)
	password: string;

	@IsString()
	name: string;

	@IsString()
	image: string;


}