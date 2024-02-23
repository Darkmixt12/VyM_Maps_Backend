import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
	_id?: string;
	@Prop( {unique: true, required: true} )
	email: string;
	@Prop( {required: true} )
	name: string;
	@Prop({required: true, minlenght: 6})
	password?: string;
	@Prop( {default: true})
	isActive: boolean;
	@Prop( { type: [String], default: ['user']})
	roles: string[];
	@Prop( {required: false})
	image?: string;

	
}

export const UserSchema = SchemaFactory.createForClass( User )
