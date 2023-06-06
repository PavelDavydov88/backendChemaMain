import {ApiProperty} from "@nestjs/swagger";

export class UpdateFilmDto {

  @ApiProperty({example: 'клин иствуд', description: 'старое имя'})
  oldName: string;

  @ApiProperty({example: 'клнт иствуд', description: 'новое имя'})
  newName: string;


}