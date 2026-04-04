import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Video extends Document {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true })
  videoUrl: string;

  @Prop()
  thumbnailUrl: string;

  @Prop({ required: true })
  duration: number;

  @Prop({ default: 'mp4' })
  format: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Course', required: true })
  courseId: MongooseSchema.Types.ObjectId;
}

export const VideoSchema = SchemaFactory.createForClass(Video);