import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/utils/enums/roles';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ unique: true, required: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true, select: false }) // 'select: false' protects password from accidental leaks in GET requests
  password: string;

  @Prop({
    type: String,
    enum: Role,
    default: Role.LEARNER,
  })
  role: Role;

  @Prop()
  profilePicture?: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isArchived: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
