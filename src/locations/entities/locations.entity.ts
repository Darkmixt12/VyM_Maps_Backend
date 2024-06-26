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
	@Prop( {required: true})
	email: string;
	@Prop( {required: true})
	telefono: string;
	@Prop( {required: false})
	image?: string;
	@Prop( {required: false})
	whatsApp?: string;
	@Prop( {required: false})
	driveToLocation?: string;
	@Prop( {required: false})
	facebook?: string;
	@Prop( {required: false})
	twitter?: string;
	@Prop( {required: false})
	instagram?: string;
	@Prop( {required: false})
	webPage?: string;
	
}

export const LocationSchema = SchemaFactory.createForClass( Location )
