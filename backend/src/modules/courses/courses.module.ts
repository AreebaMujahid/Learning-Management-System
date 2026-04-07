import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './schemas/course.schema';
import { Video, VideoSchema } from './schemas/video.schema';
import { CloudinaryModule } from 'src/shared/cloudinary/cloudinary.module';
import { CloudinaryService } from 'src/shared/cloudinary/cloudinary.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Course.name, schema: CourseSchema },
      { name: Video.name, schema: VideoSchema },
    ]),
    CloudinaryModule,
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
