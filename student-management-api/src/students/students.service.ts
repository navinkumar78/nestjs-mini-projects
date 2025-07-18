import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentDocument } from './schemas/student.schema';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    try {
      const createdStudent = new this.studentModel(createStudentDto);
      return await createdStudent.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('Email already exists');
      }
      throw error;
    }
  }

  async findAll(): Promise<Student[]> {
    return this.studentModel.find().exec();
  }

  async findOne(id: string): Promise<Student> {
    const student = await this.studentModel.findById(id).exec();
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  async update(id: string, updateStudentDto: UpdateStudentDto): Promise<Student> {
    try {
      const updatedStudent = await this.studentModel
        .findByIdAndUpdate(id, updateStudentDto, { new: true, runValidators: true })
        .exec();
      
      if (!updatedStudent) {
        throw new NotFoundException(`Student with ID ${id} not found`);
      }
      
      return updatedStudent;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('Email already exists');
      }
      throw error;
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    const deletedStudent = await this.studentModel.findByIdAndDelete(id).exec();
    if (!deletedStudent) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return { message: `Student with ID ${id} has been successfully deleted` };
  }

  // Bonus: Filter by course
  async findByCourse(course: string): Promise<Student[]> {
    return this.studentModel.find({ course }).exec();
  }

  // Bonus: Filter by year
  async findByYear(year: number): Promise<Student[]> {
    return this.studentModel.find({ year }).exec();
  }

  // Bonus: Search by name
  async searchByName(name: string): Promise<Student[]> {
    return this.studentModel.find({ 
      name: { $regex: name, $options: 'i' } 
    }).exec();
  }

  // Bonus: Pagination
  async findAllWithPagination(page: number = 1, limit: number = 2): Promise<{
    students: Student[];
    totalPages: number;
    currentPage: number;
    totalStudents: number;
  }> {
    const skip = (page - 1) * limit;
    const students = await this.studentModel
      .find()
      .skip(skip)
      .limit(limit)
      .exec();
    
    const totalStudents = await this.studentModel.countDocuments().exec();
    const totalPages = Math.ceil(totalStudents / limit);
    
    return {
      students,
      totalPages,
      currentPage: page,
      totalStudents,
    };
  }
}