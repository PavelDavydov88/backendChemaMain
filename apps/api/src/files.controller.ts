import { Controller, Get, HttpStatus, Inject, Query, Res, StreamableFile } from "@nestjs/common";
import {Response} from 'express'
import { ClientProxy } from "@nestjs/microservices";
import { FileDto } from "@app/shared/dtos/file-dto/File.dto";
import { of } from "rxjs";
import { join } from 'path';
import { createReadStream } from 'fs';
import * as process from "process";
import * as path from "path";

@Controller("files")
export class FilesController {
  constructor(@Inject("FILES_SERVICE") private readonly filesService: ClientProxy) {
  }

  @Get()
  async getFiles(/*@Query() fileDto: FileDto,*/ /*@Res() res : Response*/) {
    const file= await this.filesService.send(
      {
        cmd: "get-files"
      },
      'fileDto.namePicture',
    );
    // console.log(await file);
    // const file =
    // res.type('text/html').send(file);
    // const html = `<html><body><img src='data:image/jpeg;base64,${file}'/></body></body></html>`

    // res.contentType(file.contentType);
    // res.send(file.data);
    return file; //.pipe(res)
    // res.sendFile('C:\\learnjs-tasks\\backendChema\\apps\\files\\src\\picture\\зеленая_миля.jpg');
    // res.sendFile('C:\\learnjs-tasks\\backendChema\\apps\\files\\src\\picture\\1+1.jpg');

    // return res;
    // const file = createReadStream(join(process.cwd(), path.resolve(__dirname, 'picture', 'зеленая_миля.jpg')));
    // const file = createReadStream('C:\\learnjs-tasks\\backendChema\\apps\\files\\src\\picture\\зеленая_миля.jpg');
    // return new StreamableFile(file);
  }
}