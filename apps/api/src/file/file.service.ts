import { Injectable } from "@nestjs/common";
import * as path from "path";
import * as fs from "fs";
import * as uuid from "uuid";

@Injectable()
export class FileService {

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

    async deleteFile(name) {
        const filePath = path.resolve(__dirname, '..','..', 'static', name);
        fs.unlink(filePath,  err => {
            if (err)  throw err // не удалось удалить файл
        });
        return "Файл успешно удалён"
    }
}
