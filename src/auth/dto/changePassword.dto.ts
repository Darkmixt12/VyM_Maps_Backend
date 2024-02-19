import {MinLength} from 'class-validator';

export class ChangePasswordDto {

	@MinLength(6)
	password: string;

	@MinLength(6)
	newPassword: string;

	@MinLength(6)
	newPassword2: string;

}