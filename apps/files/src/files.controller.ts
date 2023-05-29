import { Controller, Get } from '@nestjs/common';
import { FilesService } from './files.service';
import { MessagePattern, Payload } from "@nestjs/microservices";


@Controller()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @MessagePattern({cmd :'get-files'})
  async getFilmById(listPicture){
    return await this.filesService.getPicture(listPicture);
  }

  @MessagePattern({cmd :'creat-file'})
  async creatFile(@Payload() image){

    console.log('что-то пришло');
    console.log(image);
    // return await this.filesService.creatPicture(image);
    return "ok"
  }
}
