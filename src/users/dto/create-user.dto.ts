import {IsDefined, IsEmail, IsString} from "class-validator";

export class CreateUserDto {
    @IsEmail()
    @IsDefined()
    readonly email: string

    @IsString()
    @IsDefined()
    readonly password: string
}
