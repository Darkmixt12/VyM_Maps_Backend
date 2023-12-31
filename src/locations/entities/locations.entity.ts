import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Location {
	_id?: string;
	@Prop( {unique: true, required: true} )
	title: string;
	@Prop( {type: [String], default: ['']} )
	lngLat: string[];
	@Prop({required: true})
	provincia: string;
	@Prop( {minlenght: 5})
	description?: string;
	@Prop( {required: true})
	agente: string;

	
}

export const LocationSchema = SchemaFactory.createForClass( Location )
