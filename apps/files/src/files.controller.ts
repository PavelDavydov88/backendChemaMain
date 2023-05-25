import {Controller, Get, UploadedFile, UseInterceptors} from '@nestjs/common';
import { FilesService } from './files.service';
import {Ctx, MessagePattern, Payload} from "@nestjs/microservices";
import {SharedService} from "@app/shared/services/shared/shared.service";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller()
export class FilesController {
  constructor(private readonly filesService: FilesService,
              private readonly sharedService: SharedService) {}

  @MessagePattern('createFile')
  async createFile(@Ctx() content,@Payload() image: any){
    console.log(image)

    await this.sharedService.acknowledgeMessage(content)
    const create = await this.filesService.createFile(image)
    return create
  }
}
