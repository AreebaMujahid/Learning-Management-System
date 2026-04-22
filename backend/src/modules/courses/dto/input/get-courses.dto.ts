import {
  IsOptional,
  IsString,
  IsEnum,
  IsNumber,
  Min,
  IsMongoId,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from 'src/common/pagination/pagination.input';
import { CourseCategory } from 'src/utils/enums/course-category';

export class FilterCourseDto extends PaginationDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(CourseCategory)
  category?: CourseCategory;

  @IsOptional()
  @IsMongoId({ message: 'Invalid Mentor ID format' })
  mentorId?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxPrice?: number;
}
