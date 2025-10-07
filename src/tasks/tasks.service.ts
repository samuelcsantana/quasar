import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {

  constructor(private prisma: PrismaService) { }

  private tasks: Task[] = [
    { id: 1, name: 'Task One', description: 'Description for Task One', isCompleted: false },
    { id: 2, name: 'Task Two', description: 'Description for Task Two', isCompleted: true },
    { id: 3, name: 'Task Three', description: 'Description for Task Three', isCompleted: false },
  ];

  async findAll() {
    const allTasks = await this.prisma.task.findMany();
    return allTasks;
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findFirst({ where: { id } });

    if (task) return task;

    throw new HttpException('Task not found', HttpStatus.NOT_FOUND);

  }

  create(createTaskDto: CreateTaskDto) {
    const newId = this.tasks.length + 1;
    const newTask = { id: newId, ...createTaskDto, isCompleted: false };
    this.tasks.push(newTask);
    return newTask;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updateTaskDto };
    return this.tasks[taskIndex];
  }

  delete(id: number) {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    this.tasks.splice(taskIndex, 1);
    return {
      message: 'Task deleted successfully'
    };
  }
}
