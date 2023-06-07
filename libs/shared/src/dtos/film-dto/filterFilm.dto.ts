import {ApiProperty} from "@nestjs/swagger";

export class FilterFilmDto{

    @ApiProperty({example: 'мьюзикл', description: 'сортировка по жанру'})
    readonly genre : string;


    @ApiProperty({example: 'Россия', description: 'сортировка по стране'})
    readonly country : string;

    @ApiProperty({example: '1.1', description: 'сортировка по минимальному рейтенгу'})
    readonly ratingMin : number;

    @ApiProperty({example: '9', description: 'сортировка по максимальному рейтингу'})
    readonly ratingMax : number;

    @ApiProperty({example: '5', description: 'лимит (нужен для пагинации)'})
    readonly limit : number;

    @ApiProperty({example: '20', description: 'оффсет (нужен для пагинации)'})
    readonly offset : number;

    @ApiProperty({example: '20000', description: 'мин кол-во отзывов'})
    readonly estimationMin : number;

    @ApiProperty({example: '1000000', description: 'мах кол-во отзывов'})
    readonly estimationMax : number;

    @ApiProperty({example: 'клинг иствуд', description: 'имя актера'})
    readonly artist : string;

    @ApiProperty({example: 'Артем сценарист', description: 'имя сценариста'})
    readonly writer : string;



}