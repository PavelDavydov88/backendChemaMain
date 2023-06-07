import {ApiProperty} from "@nestjs/swagger";

export class DeletePersonDto{

    @ApiProperty({example: 'Clint Eastwood', description: 'имя'})
    readonly name: string
}