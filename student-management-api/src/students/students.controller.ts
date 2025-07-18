import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  HttpCode, 
  HttpStatus,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  UseInterceptors
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { ResponseInterceptor } from '../common/interceptors/response.interceptor';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

@ApiTags('studentsssssssssssssss')
@Controller('students')
@UseInterceptors(LoggingInterceptor, ResponseInterceptor)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new student',
    description: 'This endpoint allows you to create a new student record.',
  })
  @ApiResponse({ status: 201, description: 'User successfully created' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    if (page > 1 || limit !== 10) {
      return this.studentsService.findAllWithPagination(page, limit);
    }
    return this.studentsService.findAll();
  }

  @Get('search')
  searchByName(@Query('name') name: string) {
    return this.studentsService.searchByName(name);
  }

  @Get('course/:course')
  findByCourse(@Param('course') course: string) {
    return this.studentsService.findByCourse(course);
  }

  @Get('year/:year')
  findByYear(@Param('year', ParseIntPipe) year: number) {
    return this.studentsService.findByYear(year);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }
}