import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './schemas/course.schema';
import { Video } from './schemas/video.schema';
import { CloudinaryService } from 'src/shared/cloudinary/cloudinary.service';
import { CreateCourseDto } from './dto/input/create-course.dto';
import { InternalServerErrorException } from '@nestjs/common';
@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<Course>,
    @InjectModel(Video.name) private videoModel: Model<Video>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async createCourse(createCourseDto: CreateCourseDto, file: Express.Multer.File) {
  try {
    const result: any = await this.cloudinaryService.uploadVideo(file);
    const videoUrl = result.secure_url;
    const thumbnailUrl = result.eager[0].secure_url;
    const duration = Math.round(result.duration);
    const newCourse = new this.courseModel({
      ...createCourseDto,
      thumbnail: thumbnailUrl,
      videos: [],
    });
    const savedCourse = await newCourse.save();
    const newVideo = new this.videoModel({
      title: createCourseDto.title + ' - Intro',
      videoUrl: videoUrl,
      thumbnailUrl: thumbnailUrl,
      duration: duration,
      courseId: savedCourse._id,
    });
    const savedVideo = await newVideo.save();
    savedCourse.videos.push(savedVideo._id as any);
    await savedCourse.save();

    return savedCourse;
  } catch (error) {
    throw new InternalServerErrorException(
      'Failed to create course: ' + error.message,
    );
  }
}
}
