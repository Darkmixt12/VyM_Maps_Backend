import { IsString} from 'class-validator';

export class UserDetails {

	@IsString()
	email: string

}