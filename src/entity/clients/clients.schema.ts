import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document } from 'mongoose';
import {ClientRole, PriceType, RolesEnum} from "../../enums/enums";

export type ClientDocument = Client & Document;

@Schema({
    timestamps:{
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
})
export class Client {
    @Prop({required: true, unique: true})
    name: string

    @Prop()
    name_full: string

    @Prop({required: true})
    client_role: ClientRole

    @Prop()
    price_type: PriceType

    @Prop()
    inn: number

    @Prop()
    address: string

    @Prop()
    phone: string

    @Prop()
    contact_person: string
}

export const ClientSchema = SchemaFactory.createForClass(Client)