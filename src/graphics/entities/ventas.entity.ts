import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Ventas {


	_id?: string;

	@Prop({required: true})
	codCliente  : number;

	@Prop({required: true})
	nomCliente  : string;

	@Prop({required: true})
	provCliente : string;

	@Prop({required:true})
	codVendedor : string;

	@Prop({required: true})
	importe     : number;

	@Prop({required: true})
	fechaReg    : Date;


}

export const VentasSchema = SchemaFactory.createForClass(Ventas)
