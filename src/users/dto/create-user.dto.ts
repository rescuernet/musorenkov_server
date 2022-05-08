import {IsDefined, IsEmail, IsNotEmpty, IsString} from "class-validator";
import {RolesEnum} from "../../roles/dto/roles.enum";

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
