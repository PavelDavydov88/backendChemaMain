import {ApiProperty} from "@nestjs/swagger";

export class DeleteCountryDto{

    @ApiProperty({ example: '1', description: 'Уникальный индефикатор ' })
    readonly id: number
}