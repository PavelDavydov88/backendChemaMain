import {ApiProperty} from "@nestjs/swagger";

export class CreateRoleDto{
    @ApiProperty({example: 'USER', description: 'роль пользователя'})

    readonly value: string;
    @ApiProperty({example: 'ограниченый доступ', description: 'краткое описание роли'})
    readonly description: string;
}