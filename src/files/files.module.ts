import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryProvider } from './interfaces/cloudinary.provider';

@Module({
  controllers: [FilesController],
  providers: [FilesService,CloudinaryProvider],
  imports: [ConfigModule,]
})
export class FilesModule {}
