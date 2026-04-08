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
      required: ['video', 'title', 'mentor'],
      properties: {
        video: {
          type: 'string',
          format: 'binary',
        },
        title: { type: 'string', example: 'Advanced NestJS Masterclass' },
        description: { type: 'string', example: 'Learn backend scaling' },
        price: { type: 'number', example: 49.99 },
        mentor: { type: 'string', example: '6778678...' },
        category: { type: 'string', example: 'Development' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('video'))
  async addCourse(
    @Body() createCourseDto: CreateCourseDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.coursesService.createCourse(createCourseDto, file);
  }
}
