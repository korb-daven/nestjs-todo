import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from 'src/tasks/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private TasksRepo: Repository<Task>,
  ) {}

  create(TaskData: Partial<Task>) {
    const Task = this.TasksRepo.create(TaskData);
    return this.TasksRepo.save(Task);
  }

  findAll() {
    return this.TasksRepo.find();
  }

  findOne(id: number) {
    return this.TasksRepo.findOne({ where: { id }});
  }

  async update(id: number, updateData: Partial<Task>) {
    await this.TasksRepo.update(id, updateData);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.TasksRepo.delete(id);
  }
}
