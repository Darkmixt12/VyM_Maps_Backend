import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './interfaces/cloudinary-response';
const streamifier = require('streamifier');

cloudinary.config( process.env.CLOUDINARY_URL)
@Injectable()
export class FilesService {
	
	uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {


		if( !file) return

		const fileExtension = file.mimetype.split('/')[1]
		const validExtensions = ['jpg','jpeg','png','gif']

		if( validExtensions.includes(fileExtension))
		return new Promise<CloudinaryResponse>((resolve, reject) => {
		  const uploadStream = cloudinary.uploader.upload_stream( {folder: 'locationsFolder'},
			(error, result) => {
			  if (error) return reject(error);
			  resolve(result);
			},
			
		  );
	
		  streamifier.createReadStream(file.buffer).pipe(uploadStream);
		});
	  }


	deleteFile(id: string){
		console.log(id);
		return new Promise<CloudinaryResponse>((resolve, reject) => {
			cloudinary.uploader.destroy( 'locationsFolder/'+id, 
			(error, result) => {
				if( error) return reject(error);
				resolve(result)
			}
		 )
		})
	}

 //TODO: REFACTORIZAR TODO ESTO ESTA HORRIBLE 
	uploadFileUser(file: Express.Multer.File): Promise<CloudinaryResponse> {


		if( !file) return

		const fileExtension = file.mimetype.split('/')[1]
		const validExtensions = ['jpg','jpeg','png','gif']

		if( validExtensions.includes(fileExtension))
		return new Promise<CloudinaryResponse>((resolve, reject) => {
		  const uploadStream = cloudinary.uploader.upload_stream( {folder: 'userFolder'},
			(error, result) => {
			  if (error) return reject(error);
			  resolve(result);
			},
			
		  );
	
		  streamifier.createReadStream(file.buffer).pipe(uploadStream);
		});
	  }


	deleteFileUser(id: string){
		console.log(id);
		return new Promise<CloudinaryResponse>((resolve, reject) => {
			cloudinary.uploader.destroy( 'userFolder/'+id, 
			(error, result) => {
				if( error) return reject(error);
				resolve(result)
			}
		 )
		})
	}
}
