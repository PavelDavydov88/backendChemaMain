import {ApiProperty} from "@nestjs/swagger";

export class DeleteGenreDto{
    @ApiProperty({example: 'id', description: 'уникальный индефикатор'})
    readonly id: number

}