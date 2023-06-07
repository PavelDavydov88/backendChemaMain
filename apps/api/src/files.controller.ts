// import { Controller, Get, Inject } from "@nestjs/common";
// import { ClientProxy } from "@nestjs/microservices";
//
// @Controller("files")
// export class FilesController {
//   constructor(@Inject("FILES_SERVICE") private readonly filesService: ClientProxy) {
//   }
//
//   @Get()
//   async getFiles(/*@Query() fileDto: FileDto,*/ /*@Res() res : Response*/) {
//     const file= await this.filesService.send(
//       {
//         cmd: "get-files"
//       },
//       'fileDto.namePicture',
//     );
//     // console.log(await file);
//     // const file =
//     // res.type('text/html').send(file);
//     // const html = `<html><body><img src='data:image/jpeg;base64,${file}'/></body></body></html>`
//
//     // res.contentType(file.contentType);
//     // res.send(file.data);
//     return file; //.pipe(res)
//     // res.sendFile('C:\\learnjs-tasks\\backendChema\\apps\\files\\src\\picture\\зеленая_миля.jpg');
//     // res.sendFile('C:\\learnjs-tasks\\backendChema\\apps\\files\\src\\picture\\1+1.jpg');
//
//     // return res;
//     // const file = createReadStream(join(process.cwd(), path.resolve(__dirname, 'picture', 'зеленая_миля.jpg')));
//     // const file = createReadStream('C:\\learnjs-tasks\\backendChema\\apps\\files\\src\\picture\\зеленая_миля.jpg');
//     // return new StreamableFile(file);
//   }
// }