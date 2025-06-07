import {Body, Controller,Delete,Get,Param,Patch,Post,ParseIntPipe,UsePipes,ValidationPipe,} from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';     
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { 
        // The constructor injects the TasksService to use its methods for task management.
    }
    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    createTask(@Body() createTaskDto: CreateTaskDto) {
        return this.tasksService.createTask(createTaskDto);
    }
    @Get()
    getAllTasks() { 
        return this.tasksService.getAllTasks();
    }
    @Get(':id')
    getTaskById(@Param('id', ParseIntPipe) id: number) {
        return this.tasksService.getTaskById(id);
    }
    @Patch(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    updateTask(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTaskDto: UpdateTaskDto
    ) {
        return this.tasksService.updateTask(id, updateTaskDto);
    }
    @Delete(':id')
    deleteTask(@Param('id', ParseIntPipe) id: number) {
        return this.tasksService.deleteTask(id);
    }
    
}
