import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  Min,
  IsOptional,
  IsMongoId,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CourseCategory } from '../../../../utils/enums/course-category';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty({ message: 'Course title is required' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Description cannot be empty' })
  description: string;

  @IsEnum(CourseCategory, {
    message: 'Valid category is required',
  })
  category: CourseCategory;

  @IsNumber()
  @Min(0, { message: 'Price cannot be negative' })
  @Type(() => Number)
  price: number;
}
