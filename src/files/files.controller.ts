import { Controller, Post, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config( process.env.CLOUDINARY_URL)
@Controller('files')

export class FilesController {
  constructor(
    private readonly configService : ConfigService,
    private readonly filesService: FilesService) {}


  @Post('cloudinary')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.filesService.uploadFile(file);
  }

  @Post('cloudinary/delete/:id')
  deleteFile(@Param('id') id: string){
    return this.filesService.deleteFile(id)
  }



}
