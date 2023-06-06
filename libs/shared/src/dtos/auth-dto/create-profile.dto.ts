import {ApiProperty} from "@nestjs/swagger";

export class CreateProfileDto{

    @ApiProperty({example: 'user1234@gmail.com', description: 'Почта'})
    readonly email: string;
    @ApiProperty({example: 'passSecret', description: 'пароль'})
    readonly password: string;

    @ApiProperty({example: 'user', description: 'имя пользователя'})
    readonly firstName: string;

    @ApiProperty({example: 'userovich', description: 'фамилия'})
    readonly lastName: string
}