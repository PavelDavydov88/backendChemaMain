import {ApiProperty} from "@nestjs/swagger";

export class CreateCountryDto{
    @ApiProperty({ example: 'africa', description: 'страна' })

    @ApiProperty({example: 'сша', description: 'название страны'})
    readonly name : string
}