import { Controller, Get } from '@nestjs/common';
import { FilesService } from './files.service';
import { MessagePattern } from "@nestjs/microservices";

@Controller()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @MessagePattern({cmd :'get-files'})
  async getFilmById(listPicture){
    return await this.filesService.getPicture(listPicture);
  }
}
