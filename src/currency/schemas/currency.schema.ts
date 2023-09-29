import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CurrencyDocument = HydratedDocument<Currency>;

@Schema()
export class Currency {

    @Prop()
    base: string;

    @Prop()
    target: string;

    @Prop()
    values: number;

    @Prop()
    date: string;
}

export const CurrencySchema = SchemaFactory.createForClass(Currency);