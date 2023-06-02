import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "@app/shared/models/role.model";
import {UserRoles} from "@app/shared/models/user-role.model";
import {Profile} from "@app/shared/models/profile.model";


interface UserCreationAttrs {
    email: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs > {
    @ApiProperty({example: '1', description: 'Уникальный индификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'user@mail.ru', description: 'email'})
    @Column({type: DataType.STRING, unique: true, allowNull: false}) //unique: true,
        //в видео было но у меня вылетает валид ошибка при изменение 1-2 сымволов при post, убрал
    email: string;

    @ApiProperty({example: '1246519dh', description: 'password'})
    @Column({type: DataType.STRING, allowNull: false})  //unique: true,
    password: string;

    @ApiProperty({example: 'true', description: 'ban or not'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    @ApiProperty({example: 'за хулиганство', description: 'Причина'})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string;

    @BelongsToMany(() => Role, () => UserRoles)//многие ко многим
    roles: Role[];

    @ForeignKey(() => Profile)
    @Column({type: DataType.INTEGER}) //unique: true,
    userId: number

    @BelongsTo(() => Profile)
    profile: Profile[]
}