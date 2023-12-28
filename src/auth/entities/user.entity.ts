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

	
}

export const UserSchema = SchemaFactory.createForClass( User )

@Schema()
 export class Location {
 	@Prop( {required: true} )
 	name: string;
	 @Prop( {required: true} )
 	agente: string;
 	@Prop( {required: true} )
 	provincia: string;
 	@Prop( {required: true} )
 	descripcion: string;
 	@Prop( {required: true} )
 	lngLat: [number, number]
	 @Prop( {required: true} )
 	direcciones: string
 }

export const LocationSchema = SchemaFactory.createForClass( Location )