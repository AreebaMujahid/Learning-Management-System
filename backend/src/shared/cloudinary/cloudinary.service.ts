import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async uploadVideo(file: Express.Multer.File) {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'video',
          folder: 'lms_videos',
          eager: [
            {
              width: 300,
              height: 200,
              crop: 'pad',
              format: 'jpg',
              start_offset: '10',
            },
          ],
          eager_async: false, // For testing, keep it false. For production, true is better.
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      uploadStream.end(file.buffer);
    });
  }
}
