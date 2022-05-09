import {IsDefined, IsNumber, IsString} from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsDefined()
    readonly title: string

    @IsNumber()
    @IsDefined()
    readonly price: number
}