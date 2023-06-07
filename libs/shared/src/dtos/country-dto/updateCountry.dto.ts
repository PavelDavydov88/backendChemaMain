import {ApiProperty} from "@nestjs/swagger";

export class UpdateCountryDto{

    @ApiProperty({ example: '1', description: 'Уникальный индефикатор ' })
    readonly id: number
    @ApiProperty({ example: 'africa', description: 'страна' })
    readonly name: string
}