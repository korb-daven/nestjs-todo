import {
  Get,
  Param,
  Controller,
  Post,
  Body,
  Patch,
  Delete,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getTasks() {
    return this.taskService.findAll();
  }

  @Get(':id')
  getTask(
    @Param('id') id: number,
  ) {
    return this.taskService.findOne(id);
  }

  @Post('/')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createTask(@Body() body: CreateTaskDto) {
    return this.taskService.create(body);
  }

  @Patch(':id')
  updateTask(
    @Param('id') id: number,
    @Body() body: { name: string; description: string; },
  ) {
    return this.taskService.update(id, body);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: number) {
    return this.taskService.remove(id);
  }
}
