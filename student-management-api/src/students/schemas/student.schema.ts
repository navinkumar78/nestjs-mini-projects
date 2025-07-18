import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StudentDocument = Student & Document;

@Schema({ timestamps: true })
export class Student {
  @Prop({ required: true, minlength: 2, maxlength: 50 })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, min: 16, max: 60 })
  age: number;

  @Prop({ 
    required: true, 
    enum: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering'] 
  })
  course: string;

  @Prop({ required: true, min: 1, max: 4 })
  year: number;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const StudentSchema = SchemaFactory.createForClass(Student);