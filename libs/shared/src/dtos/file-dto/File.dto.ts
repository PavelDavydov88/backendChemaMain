import {ApiProperty} from "@nestjs/swagger";

export class FileDto{

    @ApiProperty({example: 'донни дарко', description: 'название картинки'})
    readonly namePicture : string;

}