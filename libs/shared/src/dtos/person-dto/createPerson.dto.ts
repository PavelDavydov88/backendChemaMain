import {ApiProperty} from "@nestjs/swagger";

export class CreatePersonDto {

     @ApiProperty({example: 'Клинт Иствуд', description: 'имя деятеля кино'})
     name: string
     @ApiProperty({example: 'Clint Eastwood', description: 'имя деятеля кино на ангглийском'})
     nameEng: string

     @ApiProperty({example: '2м', description: 'рост'})
     height: string

     @ApiProperty({example: '1.1.2100', description: 'дата рождения'})
     birthday: string

     @ApiProperty({example: '2.2.2105', description: 'дата смерти'})
     death_date: string

     @ApiProperty({example: 'Россия ', description: 'страна'})
     country: string

     @ApiProperty({example: 'Дикий запад, нападение на рио браво', description: 'лучшие фильмы с участием этого человека'})
     bestFilm: string[]

     @ApiProperty({example: 'актре, режиссер', description: 'массив профессий (можно передать и одно значение)'})
     occupation: string[]

     @ApiProperty({example: 'драма, ужасы', description: 'массив жанром (можно передать и одно значение)'})
     genre: string[]

     @ApiProperty({example: 'picture.jpg', description: 'имя картинки'})
     picture_person : string




}