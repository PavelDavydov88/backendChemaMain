import {ApiProperty} from "@nestjs/swagger";

export class UpdateOccupationDto {
    @ApiProperty({example: '1', description: 'уникильный индефикатор'})
    readonly id: number

    @ApiProperty({example: 'режиссер', description: 'название професси'})
    readonly name: string

}