// src/students/dto/create-student.dto.ts
import { IsInt, IsString, IsNotEmpty, Min, Max } from 'class-validator';

export class CreateStudentDto {
  @IsInt()
  @Min(1)
  id: number;

  @IsString()
  @IsNotEmpty()
  section: string;

  @IsInt()
  @Min(0)
  @Max(100)
  marks: number;
}
