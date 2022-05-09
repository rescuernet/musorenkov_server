import {IsDefined, IsEmail, IsNotEmpty, IsString} from "class-validator";
import {RolesEnum} from "../../../enums/enums";

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    readonly email: string

    @IsString()
    @IsNotEmpty()
    readonly password: string

    readonly _id?: string

    readonly roles: RolesEnum[]

}
