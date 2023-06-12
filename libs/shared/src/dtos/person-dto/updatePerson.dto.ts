import {ApiProperty} from "@nestjs/swagger";

export class UpdatePersonDto{

    @ApiProperty({example: 'Clint Eastwood', description: 'новое имя'})
    readonly newName: string
    @ApiProperty({example: 'old Clint Eastwood', description: 'нынешнее имя'})
    readonly oldName: string
}