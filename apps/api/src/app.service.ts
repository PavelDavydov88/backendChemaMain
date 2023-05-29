import { HttpException, Injectable } from "@nestjs/common";
import * as path from "path";
import * as fs from "fs";
import * as uuid from 'uuid';
import { Payload } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { configLoader } from "tsconfig-paths/lib/config-loader";

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async creatFile(file : any) {
    try {
      const fileBuffer = Buffer.from(file.buffer)
      const fileExtension = "jpg";
      const fileName = uuid.v4() + '.' + fileExtension;
      const filePath = path.resolve(__dirname, '..','..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, {recursive: true});
      }
      fs.writeFileSync(path.resolve(filePath, fileName), fileBuffer);
      return fileName;
    }
    catch (e) {
      console.log(e);
      console.log("ошибка при работе с файлом");
      return null;
    }
  }

  async deleteFile(response: Observable<string>) {
    const namePicture = await response.subscribe();
    console.log("namePicture = " + namePicture);
  }
}
