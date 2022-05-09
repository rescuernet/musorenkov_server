import {IsNotEmpty} from "class-validator";
import {ClientRole, PriceType} from "../../../enums/enums";

export class CreateClientDto {

    @IsNotEmpty()
    readonly name: string

    readonly name_full: string

    @IsNotEmpty()
    readonly client_role: ClientRole

    @IsNotEmpty()
    readonly price_type: PriceType

    readonly inn?: number

    readonly address?: string

    readonly phone?: string

    readonly contact_person?: string
}