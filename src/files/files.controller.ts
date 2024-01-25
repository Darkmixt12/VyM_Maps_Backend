import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, BadRequestException, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { Response } from 'express'
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter, fileNamer } from './helpers';
import { diskStorage } from 'multer';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config( process.env.CLOUDINARY_URL)
@Controller('files')

export class FilesController {
  constructor(
    private readonly configService : ConfigService,
    private readonly filesService: FilesService) {}


  @Get('location-image/:imageName')
  findProductImage(
    @Res() res: Response,
    @Param('imageName') imageName: string
  ) {

    const path = this.filesService.getStaticImageLocation( imageName)

    res.sendFile( path)
  }


  @Post('cloudinary')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.filesService.uploadFile(file);
  }

  

  @Post('location-image')
  @UseInterceptors( FileInterceptor('file', {
    fileFilter: fileFilter,
    //limits: {fileSize: 10000}, limita el tamaño del file :D
    storage: diskStorage( {
      destination: './static/locations',
      filename: fileNamer
    }
     )

     

 }) )


  uploadLocationImage(  @UploadedFile() file : Express.Multer.File){
    
    if  (!file){
      throw new BadRequestException('Asegurate de que el archivo es una imagen')
    }

      const secureUrl = `${ this.configService.get('HOST_API')}/files/location-image/${ file.filename}`;


    return{ secureUrl }
  }


}
