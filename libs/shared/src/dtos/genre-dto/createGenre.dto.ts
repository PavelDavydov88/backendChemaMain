import {ApiProperty} from "@nestjs/swagger";

export class CreateGenreDto{


    @ApiProperty({example: 'фантастика', description: 'имя жанра'})
    readonly name: string
}