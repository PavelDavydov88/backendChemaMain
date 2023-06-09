import { ApiProperty } from "@nestjs/swagger";

export class DeleteOccupationDto {
    @ApiProperty({example: 'id', description: 'уникальный индефикатор'})
    readonly name : string
}