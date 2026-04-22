import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Expose, Type } from 'class-transformer';
class MentorResponseDto {
  @Expose()
  name: string;

  @Expose()
  profilePicture: string;
}
class VideoResponseDto {
  @Expose()
  thumbnailUrl: string;
}
export class CourseResponseDto {
  @Expose()
  _id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  price: number;

  @Expose()
  category: string;

  @Expose()
  @Type(() => MentorResponseDto)
  mentor: MentorResponseDto;

  @Expose()
  @Type(() => VideoResponseDto)
  videos: VideoResponseDto[];

  @Expose()
  createdAt: Date;
}
@ObjectType()
export class PaginatedListings {
  @Field(() => [CourseResponseDto])
  data: CourseResponseDto[];

  @Field(() => Int)
  total: number;

  @Field(() => Int, { nullable: true })
  prevPage: number;

  @Field(() => Int, { nullable: true })
  nextPage: number;

  @Field(() => Boolean)
  hasNextPage: boolean;

  @Field(() => Boolean)
  hasPreviousPage: boolean;

  @Field(() => Int)
  totalPages: number;

  @Field(() => Int)
  perPage: number;
}
