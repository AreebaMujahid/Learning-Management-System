import { Controller } from '@nestjs/common';
import {
  Body,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/input/create-course.dto';
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post('add')
  @UseInterceptors(FileInterceptor('video'))
  async addCourse(
    @UploadedFile() file: Express.Multer.File,
    @Body() createCourseDto: CreateCourseDto,
  ) {
    return await this.coursesService.createCourse(createCourseDto, file);
  }
}
