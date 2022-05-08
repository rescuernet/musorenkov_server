import {Global, Module} from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import {JwtModule} from "@nestjs/jwt";
import {MongooseModule} from "@nestjs/mongoose";
import {Token, TokenSchema} from "./token.schema";

@Global()
@Module({
  controllers: [TokenController],
  providers: [TokenService],
  imports: [
    JwtModule.register({
      secret: String(process.env.PRIVATE_KEY),
      signOptions: {
        expiresIn: '1m'
      }
    }),
    MongooseModule.forFeature([
      {name: Token.name, schema: TokenSchema}
    ]),
  ],
  exports: [
    TokenService,
  ]
})
export class TokenModule {}