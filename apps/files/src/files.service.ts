import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as path from "path";
import * as fs from 'fs';
import * as uuid from 'uuid';
@Injectable()
export class FilesService {
  async createFile(file): Promise<string>{
    try{
      const fileName = file.originalname;
      // console.log(fileName)
      const fileBuffer = Buffer.from(file.buffer.data)
      const filePath = path.resolve(__dirname, '..', 'static')
      // если такого пути нет, создать путь
      if(!fs.existsSync(filePath)){
        fs.mkdirSync(filePath, {recursive: true})
      }
      fs.writeFileSync(path.join(filePath, fileName), fileBuffer)

      return fileName;

    }catch (e){
      throw new HttpException('произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)//серверная ошибка
    }

  }

}
