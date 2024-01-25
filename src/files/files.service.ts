import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './interfaces/cloudinary-response';
const streamifier = require('streamifier');

cloudinary.config( process.env.CLOUDINARY_URL)
@Injectable()
export class FilesService {
	

	getStaticImageLocation( imageName : string){
			
			const path = join( __dirname, '../../static/locations', imageName );

			if ( !existsSync(path))
				throw new BadRequestException(`No product found with image ${ imageName}`)

			return path;
	}

	uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {


		if( !file) return

		const fileExtension = file.mimetype.split('/')[1]
		const validExtensions = ['jpg','jpeg','png','gif']

		if( validExtensions.includes(fileExtension))
		return new Promise<CloudinaryResponse>((resolve, reject) => {
		  const uploadStream = cloudinary.uploader.upload_stream( {folder: 'locationsFolder'},
			(error, result) => {
			  if (error) return reject(error);
			  resolve(result );
			},
			
		  );
	
		  streamifier.createReadStream(file.buffer).pipe(uploadStream);
		});
	  }
}
