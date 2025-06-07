import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentsService {
  private students:any = [];

  create(dto: CreateStudentDto) {
    this.students.push(dto);
    return dto;
  }

  findAll() {
    return this.students;
  }
}
