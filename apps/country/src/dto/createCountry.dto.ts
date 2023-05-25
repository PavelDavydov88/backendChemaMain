import {ApiProperty} from "@nestjs/swagger";

export class CreateCountryDto{
    @ApiProperty({ example: 'africa', description: 'страна' })

    readonly name : string
}