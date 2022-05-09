import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type RolesDocument = Roles & Document;

@Schema({
    timestamps:{
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
})
export class Roles {
    @Prop({required: true, unique: true})
    value: string

    @Prop({required: true})
    description: string
}

export const RolesSchema = SchemaFactory.createForClass(Roles)