import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryProvider } from './cloudinary/cloudinary.provider';
import { CloudinaryService } from './cloudinary/cloudinary.service';

@Module({
  providers: [JwtService, CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryProvider, CloudinaryService], 
})
export class SharedModule {}
