import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { CourseCategory } from 'src/utils/enums/course-category';

@Schema({ timestamps: true })
export class Course extends Document {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: CourseCategory })
  category: CourseCategory;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  mentor: MongooseSchema.Types.ObjectId;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Video' }] })
  videos: MongooseSchema.Types.ObjectId[];

  // Enrollment logic
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] })
  enrolledLearners: MongooseSchema.Types.ObjectId[];

  @Prop({ default: 0 })
  price: number;
}

export const CourseSchema = SchemaFactory.createForClass(Course);