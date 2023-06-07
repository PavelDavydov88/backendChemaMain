import {ApiProperty} from "@nestjs/swagger";

export class CreatFilmDto {

  @ApiProperty({example: 'сопрано', description: 'имя фильма'})
  name: string;

  @ApiProperty({example: 'the sopranos', description: 'имя фильма на английском'})
  nameEng: string;

  @ApiProperty({example: '9.5', description: 'рейтинг'})
  rating: number;

  @ApiProperty({example: '99999', description: 'кол-во оценок зрителей'})
  estimation: string;

  @ApiProperty({example: 'рус, eng', description: 'наличие субтитров'})
  subtitles: string;

  @ApiProperty({example: 'рус, eng', description: 'наличие озвучки или дубляжа'})
  audio_track: string;

  @ApiProperty({example: '1999', description: 'год выпуска'})
  year: number;

  @ApiProperty({example: 'слоган', description: 'слоган к фильму'})
  slogan: string;

  @ApiProperty({example: '1000000$', description: 'бюджет'})
  budget: string;

  @ApiProperty({example: '1000000$', description: 'сборы в США'})
  tax_usa: string;
  @ApiProperty({example: '1000000$', description: 'сборы в мире'})
  tax_world: string;

  @ApiProperty({example: '1000000$', description: 'сборы в России'})
  tax_rus: string;

  @ApiProperty({example: '01.01.2000', description: 'дата выхода в мире'})
  release_world: string;

  @ApiProperty({example: '01.01.2000', description: 'дата выхода в России'})
  release_rus: string;

  @ApiProperty({example: '01.03.2000', description: 'дата выхода на DVD'})
  release_dvd: string;

  @ApiProperty({example: '18+, R', description: 'возрастное ограничение'})
  age_restrict: string;

  @ApiProperty({example: '2 часа', description: 'длительность'})
  time_during: string;

  @ApiProperty({example: '8', description: 'рейтинг MPAA'})
  rating_MPAA: string;

  @ApiProperty({example: 'https://video.mp4', description: 'трейлера'})
  trailer: string;

  @ApiProperty({example: 'picture.jpeg', description: 'картинка'})
  picture_film: string;

  @ApiProperty({example: 'США, Франция и тд', description: 'массив стран(может принять и одно значение)'})
  country: string[];

  @ApiProperty({example: 'спорт, триллер и тд', description: 'массив жанров(может принять и одно значение)'})
  genre: string[];

  @ApiProperty({example: 'Алекс, Волков Петр', description: 'массив Режиссеров(может принять и одно значение)'})
  filmDirector: string[];

  @ApiProperty({example: 'Котов, Толмов', description: 'массив сценаристов(может принять и одно значение)'})
  filmWriter: string[];

  @ApiProperty({example: 'Андреев, Эксель', description: 'массив продюсеров(может принять и одно значение)'})
  filmProducer: string[];

  @ApiProperty({example: 'Котов, Толмов', description: 'массив операторов(может принять и одно значение)'})
  filmOperator: string[];

  @ApiProperty({example: 'Прусикин, Цимер', description: 'массив композиторов(может принять и одно значение)'})
  filmComposer: string[];

  @ApiProperty({example: 'Кристофер Малтисанти', description: 'массив ВСЕХ актеров(может принять и одно значение)'})
  filmArtist: string[];

  @ApiProperty({example: 'Алиса', description: 'массив монтажеров(может принять и одно значение)'})
  filmEditor: string[];

  @ApiProperty({example: 'Кристофер Малтисанти', description: 'массив актеров первого плана(может принять и одно значение)'})
  mainActors: string[];

  @ApiProperty({example: 'Вася, Петя, Оля', description: 'массив актеров дубляжа(может принять и одно значение)'})
  filmTranslators: string[];

  @ApiProperty({example: 'во все тяжкие', description: 'массив похожих фильмов(может принять и одно значение)'})
  similarFilms: string[];


}