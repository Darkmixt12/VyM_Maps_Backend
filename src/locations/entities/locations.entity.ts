import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Location {
	_id?: string;
	@Prop( {unique: true, required: true} )
	name: string;
	@Prop( {required: true} )
	ubicacion: string;
	@Prop({required: true})
	provincia: string;
	@Prop( {default: true, minlenght: 6})
	description?: string;
	@Prop( { required: true})
	agente: string;

	
}

export const LocationSchema = SchemaFactory.createForClass( Location )
