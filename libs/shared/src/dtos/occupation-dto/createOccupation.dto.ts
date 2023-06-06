import {ApiProperty} from "@nestjs/swagger";

export class CreateOccupationDto {
    @ApiProperty({example: 'режиссер', description: 'название професси'})
    readonly name : string
}