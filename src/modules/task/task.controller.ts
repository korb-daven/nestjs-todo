import {
  Get,
  Param,
  Controller,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { TaskService } from './task.service';
// import { createTaskDto } from './dto/create-task.dto';

@Controller('Tasks')
export class TasksController {
  constructor(private readonly TaskService: TaskService) {}

  @Get()
  getTasks() {
    return this.TaskService.findAll();
  }

  @Get(':id')
  getTask(
    @Param('id') id: number,
  ) {
    return this.TaskService.findOne(id);
  }

  @Post('/')
  createTask(@Body() body: any) {
    return this.TaskService.create(body);
  }

  @Patch('/:id')
  updateTask(
    @Param('id') id: number,
    @Body() body: { name: string; description: string; },
  ) {
    return this.TaskService.update(id, body);
  }

  @Delete('/Tasks/:id')
  deleteTask(@Param('id') id: number) {
    return this.TaskService.remove(id);
  }
}
