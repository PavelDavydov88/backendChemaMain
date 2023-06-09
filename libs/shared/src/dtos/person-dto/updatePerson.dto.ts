import {ApiProperty} from "@nestjs/swagger";

export class UpdatePersonDto{

    @ApiProperty({example: 'Clint Eastwood', description: 'новое имя'})
    readonly newName: string

    readonly oldName: string
}