import {Controller, Inject} from '@nestjs/common';
import {FileService} from "./file.service";

@Controller('file')
export class FileController {
    constructor(
        private readonly fileService: FileService
    ) {}

    async createFile(file){
        return await this.fileService.createFile(file)
    }
}
