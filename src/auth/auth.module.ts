import {forwardRef, Global, Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {UsersModule} from "../users/users.module";
import {TokenService} from "../token/token.service";
import {TokenModule} from "../token/token.module";

@Global()
@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        UsersModule,
        TokenModule
    ],
    exports: [
        AuthService,
    ]
})

export class AuthModule {
}
