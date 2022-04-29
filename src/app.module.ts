import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {ProductsModule} from "./products/products.module";
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import {APP_GUARD} from "@nestjs/core";
import {JwtAuthGuard} from "./auth/jwt-auth-guard";
import {JwtService} from "@nestjs/jwt";

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        ProductsModule,
        MongooseModule.forRoot(process.env.MONGO_DB),
        UsersModule,
        RolesModule,
        AuthModule
    ],
})
export class AppModule {
}
