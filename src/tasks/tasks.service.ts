import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {

  private tasks: Task[] = [
    { id: 1, name: 'Task One', description: 'Description for Task One', isCompleted: false },
    { id: 2, name: 'Task Two', description: 'Description for Task Two', isCompleted: true },
    { id: 3, name: 'Task Three', description: 'Description for Task Three', isCompleted: false },
  ];

  findAll() {
    return this.tasks;
  }
  findOne(id: string) {
    const task = this.tasks.find(task => task.id === Number(id));

    if (task) return task;

    throw new HttpException('Task not found', HttpStatus.NOT_FOUND);

  }

  create(createTaskDto: CreateTaskDto) {
    const newId = this.tasks.length + 1;
    const newTask = { id: newId, ...createTaskDto, isCompleted: false };
    this.tasks.push(newTask);
    return newTask;
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    const taskIndex = this.tasks.findIndex(task => task.id === Number(id));
    if (taskIndex === -1) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updateTaskDto };
    return this.tasks[taskIndex];
  }

  delete(id: string) {
    const taskIndex = this.tasks.findIndex(task => task.id === Number(id));
    if (taskIndex === -1) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    this.tasks.splice(taskIndex, 1);
    return {
      message: 'Task deleted successfully'
    };
  }
}
