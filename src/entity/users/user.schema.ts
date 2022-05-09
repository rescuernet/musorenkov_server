import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document } from 'mongoose';
import {RolesEnum} from "../../enums/enums";

export type UserDocument = User & Document;

@Schema({
    timestamps:{
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
})
export class User {
    @Prop({required: true, unique: true})
    email: string

    @Prop({required: true})
    password: string

    @Prop({required: true})
    roles: RolesEnum[]
}

export const UserSchema = SchemaFactory.createForClass(User)