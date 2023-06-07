import {ApiProperty} from "@nestjs/swagger";

export class UpdateGenreDto{
    @ApiProperty({example: 'id', description: 'уникальный индефикатор'})
    readonly id: number

    @ApiProperty({example: 'фантастика', description: 'имя жанра'})
    readonly name: string
}