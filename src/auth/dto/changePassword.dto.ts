import {IsString, MinLength} from 'class-validator';

export class ChangePasswordDto {

	@IsString()
	email: string

	@MinLength(6)
	password: string;

	@MinLength(6)
	newPassword: string;

	@MinLength(6)
	newPassword2: string;

}