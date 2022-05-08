import {IsDefined, IsEmail, IsString} from "class-validator";
import {RolesEnum} from "../../roles/dto/roles.enum";

export class UserDto {
    @IsEmail()
    @IsDefined()
    readonly email: string

    @IsString()
    @IsDefined()
    readonly password: string

    readonly _id: string

    readonly roles: RolesEnum[]

}
