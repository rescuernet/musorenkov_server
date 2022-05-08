import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Token, TokenDocument} from "./token.schema";

@Injectable()
export class TokenService {
    constructor(
        private jwtService: JwtService,
        @InjectModel(Token.name) private tokenModel: Model<TokenDocument>) {}

    async generateToken(user:CreateUserDto){
        const payload = {email: user.email, id: user._id, roles:user.roles}
        const data = {
            tokens:{
                token: this.jwtService.sign(payload),
                tokenRefresh: this.jwtService.sign({id: payload.id}, {expiresIn: '30d'})
            },
            user: {email: user.email, id: user._id, roles:user.roles}
        }
        const tokenDB = await this.tokenModel.findOne({user: user._id})
        if (tokenDB) {
            tokenDB.refreshToken = data.tokens.tokenRefresh;
            tokenDB.save();
        }else{
            await this.tokenModel.create({user: user._id, refreshToken: data.tokens.tokenRefresh});
        }
        return data
    }

    async verify(token){
        try {
            return this.jwtService.verify(token)
        } catch (e) {
            throw new UnauthorizedException({message: 'Не корректные данные авторизации'})
        }

    }

    async findTokenDB(refreshToken){
        return this.tokenModel.findOne({refreshToken})
    }

    refresh(refreshToken){

    }

}
