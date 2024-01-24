import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter';
import { diskStorage } from 'multer';


@Controller('files')

export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('location-image')
  @UseInterceptors( FileInterceptor('file', {
    fileFilter: fileFilter,
    //limits: {fileSize: 10000}, limita el tamaño del file :D
    storage: diskStorage( {
      destination: './static/locations'
    } )
  }) )
  uploadLocationImage(  @UploadedFile() file : Express.Multer.File){
    
    if  (!file){
      throw new BadRequestException('Asegurate de que el archivo es una imagen')
    }

    console.log({ fileInController: file });
    return{
      fileName: file.originalname
    }
  }


}
