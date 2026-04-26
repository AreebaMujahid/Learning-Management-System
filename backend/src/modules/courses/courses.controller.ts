import { Controller } from '@nestjs/common';
import {
  Body,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/input/create-course.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FilterCourseDto } from 'src/modules/courses/dto/input/get-courses.dto';
import { CurrentUser } from 'src/utils/decorators/user.decorator';
import { type  JwtTokenPayload } from 'src/utils/types/token.payload';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add')
  @ApiOperation({ summary: 'Create a new course with an intro video' })
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth('JWT-auth')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['video', 'title'],
      properties: {
        video: {
          type: 'string',
          format: 'binary',
        },
        title: { type: 'string', example: 'Advanced NestJS Masterclass' },
        description: { type: 'string', example: 'Learn backend scaling' },
        price: { type: 'number', example: 49.99 },
        category: { type: 'string', example: 'Development' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('video'))
  async addCourse(
    @Body() createCourseDto: CreateCourseDto,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser()
    user: JwtTokenPayload,
  ) {
    return await this.coursesService.createCourse(createCourseDto, file, user);
  }

  //filters: course name , category, mentor name, price range
  @UseGuards(JwtAuthGuard)
  @Post('courses')
  @ApiOperation({ summary: 'View all courses with filters and pagination' })
  @ApiBearerAuth('JWT-auth')
  async getCourses(@Body() filterCourseDto: FilterCourseDto) {
    return await this.coursesService.getAllCourses(filterCourseDto);
  }
}
