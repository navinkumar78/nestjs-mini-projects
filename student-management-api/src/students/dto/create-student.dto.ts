import {
  IsString,
  IsEmail,
  IsNumber,
  IsEnum,
  Min,
  Max,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({example:'naveen',description:'Unique username'})
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @MaxLength(50, { message: 'Name must not exceed 50 characters' })
  name: string;

  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @IsNumber({}, { message: 'Age must be a number' })
  @Min(16, { message: 'Age must be at least 16' })
  @Max(60, { message: 'Age must not exceed 60' })
  age: number;

  @IsEnum(
    [
      'Computer Science',
      'Electrical Engineering',
      'Mechanical Engineering',
      'Civil Engineering',
    ],
    {
      message:
        'Course must be one of: Computer Science, Electrical Engineering, Mechanical Engineering, Civil Engineering',
    },
  )
  course: string;

  @IsNumber({}, { message: 'Year must be a number' })
  @Min(1, { message: 'Year must be between 1 and 4' })
  @Max(4, { message: 'Year must be between 1 and 4' })
  year: number;
}
