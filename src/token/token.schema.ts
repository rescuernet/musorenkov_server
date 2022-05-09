import * as mongoose from 'mongoose';
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {User} from "../entity/users/user.schema";

export type TokenDocument = Token & mongoose.Document;

@Schema({
    timestamps:{
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
})
export class Token {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User

    @Prop({required: true})
    refreshToken: string
}

export const TokenSchema = SchemaFactory.createForClass(Token)