import {ApiProperty} from "@nestjs/swagger";

export class DeleteFilmDto {

  @ApiProperty({example: 'хатико', description: 'название фильма'})
  name: string;


}