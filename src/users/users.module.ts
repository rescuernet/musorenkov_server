import {forwardRef, Module} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./user.schema";
import {AuthModule} from "../auth/auth.module";
import {JwtService} from "@nestjs/jwt";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
      MongooseModule.forFeature([
          {name: User.name, schema: UserSchema}
      ]),
  ],
  exports: [UsersService]
})
export class UsersModule {}
