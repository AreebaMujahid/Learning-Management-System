import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Course } from './schemas/course.schema';
import { Video } from './schemas/video.schema';
import { CloudinaryService } from 'src/shared/cloudinary/cloudinary.service';
import { CreateCourseDto } from './dto/input/create-course.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { FilterCourseDto } from './dto/input/get-courses.dto';
import { plainToInstance } from 'class-transformer';
import { CourseResponseDto } from './dto/response/get-courses-response.dto';
@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<Course>,
    @InjectModel(Video.name) private videoModel: Model<Video>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async createCourse(
    createCourseDto: CreateCourseDto,
    file: Express.Multer.File,
  ) {
    try {
      const result: any = await this.cloudinaryService.uploadVideo(file);
      const videoUrl = result.secure_url;
      const thumbnailUrl = result.eager[0].secure_url;
      const duration = Math.round(result.duration);
      const { mentor, ...rest } = createCourseDto;
      const newCourse = new this.courseModel({
        ...createCourseDto,
        mentor: new Types.ObjectId(mentor),
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

  async getAllCourses(filterCourseDto: FilterCourseDto) {
    const { page, size, title, category, mentorId, minPrice, maxPrice } =
      filterCourseDto;
    const query: any = {};
    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }
    if (category) {
      query.category = category;
    }
    if (mentorId) {
      query.mentor = mentorId;
    }
    if (minPrice || maxPrice) {
      query.price = {
        ...(minPrice !== undefined && { $gte: minPrice }),
        ...(maxPrice !== undefined && { $lte: maxPrice }),
      };
    }
    const limit = size || 10;
    const skip = (page - 1) * limit;

    const [courses, total] = await Promise.all([
      this.courseModel
        .find(query)
        .select('title description price category mentor videos createdAt')
        .populate('mentor', 'name profilePicture')
        .populate({
          path: 'videos',
          select: 'thumbnailUrl',
          options: { limit: 1 },
        })
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: -1 })
        .lean()
        .exec(),
      this.courseModel.countDocuments(query),
    ]);
    const courseInstances = plainToInstance(CourseResponseDto, courses, {
      excludeExtraneousValues: true,
    });
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;
    return {
      data: courseInstances,
      total: total,
      totalPages: totalPages,
      perPage: limit,
      currentPage: page,
      nextPage: hasNextPage ? page + 1 : null,
      prevPage: hasPreviousPage ? page - 1 : null,
      hasNextPage: hasNextPage,
      hasPreviousPage: hasPreviousPage,
    };
  }
}
