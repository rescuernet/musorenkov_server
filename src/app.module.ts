import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {ProductsModule} from "./entity/products/products.module";
import { UsersModule } from './entity/users/users.module';
import {ConfigModule} from "@nestjs/config";
import { RolesModule } from './entity/roles/roles.module';
import { AuthModule } from './auth/auth.module';
import {TokenModule} from "./token/token.module";
import { ClientsModule } from './entity/clients/clients.module';

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        MongooseModule.forRoot(process.env.MONGO_DB),
        ProductsModule,
        UsersModule,
        RolesModule,
        AuthModule,
        ClientsModule,
    ],
})

export class AppModule {}