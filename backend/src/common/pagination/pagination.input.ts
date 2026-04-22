import { IsOptional, IsPositive, Min, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page: number = 1;

  @IsOptional()
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  size?: number = 10;
}
