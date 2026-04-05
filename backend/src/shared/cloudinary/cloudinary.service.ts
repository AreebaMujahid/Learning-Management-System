import { Injectable, BadRequestException } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async uploadVideo(file: Express.Multer.File): Promise<any> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          resource_type: 'video',
          folder: 'lms_videos',
        },
        (error: UploadApiErrorResponse, result: UploadApiResponse) => {
          if (error) return reject(error);

          // Replace extension with .jpg and add 'so_10' (start offset 10s)
          // Example: video.mp4 -> video.jpg with transformation
          const thumbnailUrl = result.secure_url
            .replace(/\.[^/.]+$/, '.jpg') 
            .replace('/upload/', '/upload/so_10,w_400,h_250,c_fill/');

          resolve({
            url: result.secure_url,
            thumbnailUrl: thumbnailUrl,
            duration: Math.round(result.duration),
            publicId: result.public_id,
          });
        },
      );
      
      // Buffer send karna zaroori hai kyunke hum disk storage use nahi kar rahe
      upload.end(file.buffer);
    });
  }
}