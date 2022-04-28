import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {ProductsModule} from "./products/products.module";
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        ProductsModule,
        MongooseModule.forRoot(process.env.MONGO_DB),
        UsersModule
    ],
})
export class AppModule {
}
