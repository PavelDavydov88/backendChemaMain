import { Column, DataType, Model, Table } from "sequelize-typescript";


interface FilmCreationAttrs {
  name: string;

}

@Table({ tableName: "film", createdAt: false, updatedAt: false })
export class Film extends Model<Film, FilmCreationAttrs> {

  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, defaultValue: null })
  name: string;

  @Column({ type: DataType.STRING, defaultValue: null })
  nameEng: string;

  @Column({ type: DataType.REAL, defaultValue: null })
  rating: number;

  @Column({ type: DataType.STRING, defaultValue: null })
  estimation: string;

  @Column({ type: DataType.STRING, defaultValue: null })
  subtitles: string;

  @Column({ type: DataType.STRING, defaultValue: null })
  audio_track: string;


  @Column({ type: DataType.INTEGER, defaultValue: null })
  year: number;

  @Column({ type: DataType.STRING, defaultValue: null })
  slogan: string;

  @Column({ type: DataType.STRING, defaultValue: null })
  budget: string;

  @Column({ type: DataType.STRING, defaultValue: null })
  tax_usa: string;

  @Column({ type: DataType.STRING, defaultValue: null })
  tax_world: string;

  @Column({ type: DataType.STRING, defaultValue: null })
  tax_rus: string;

  @Column({ type: DataType.STRING, defaultValue: null })
  release_world: string;

  @Column({ type: DataType.STRING, defaultValue: null })
  release_rus: string;

  @Column({ type: DataType.STRING, defaultValue: null })
  release_dvd: string;

  @Column({ type: DataType.STRING, defaultValue: null })
  age_restrict: string;

  @Column({ type: DataType.STRING, defaultValue: null })
  time_during: string;

  @Column({ type: DataType.STRING, defaultValue: null })
  rating_MPAA: string;

  @Column({ type: DataType.STRING, defaultValue: null })
  trailer: string;

  @Column({ type: DataType.STRING, defaultValue: null })
  picture_URL: string;

  @Column({ type: DataType.STRING, defaultValue: null })
    // picture_local_URL: string;
  picture_film: string;

}