import {BelongsToMany, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "@app/shared/models/user.model";

//CreationAtrrs inteface это поле где нужно указать какие значения будут нужны для создания  объекта
interface ProfileCreationAttrs {
    email: string;
    password: string;

    firstName: string;

    lastName: string;

    numberPhone: number;

    gender: string

}

@Table({tableName: 'profile'})
export class Profile extends Model<Profile, ProfileCreationAttrs >{

    @ApiProperty({ example: '1', description: 'Уникальный индефикатор' })
    @Column({type: DataType.INTEGER, unique: true, autoIncrement:true, primaryKey: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    id: number;


    @ApiProperty({ example: 'user123gmail.com', description: 'mail' })
    @Column({type: DataType.STRING, unique: true,  allowNull: false}) //unique: true,
        //в видео было но у меня вылетает валид ошибка при изменение 1-2 сымволов при post, убрал
    email: string;


    @ApiProperty({ example: 'oleg', description: 'имя пользователя' })
    @Column({type: DataType.STRING,  allowNull: false})  //unique: true,
    firstName: string;


    @ApiProperty({ example: 'olegovich', description: 'фамилия' })
    @Column({type: DataType.STRING, allowNull: false })
    lastName: string;


    @HasOne(() => User)
    user: User[]
}