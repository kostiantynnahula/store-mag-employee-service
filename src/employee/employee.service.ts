import { Injectable } from '@nestjs/common';
import { Employee } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}

  async list(): Promise<Employee[]> {
    return this.prisma.employee.findMany();
  }

  async create(data: CreateEmployeeDto): Promise<Employee> {
    const userId = new Date().getTime().toString();

    return this.prisma.employee.create({ data: { ...data, user_id: userId } });
  }

  async update({ id, ...data }: UpdateEmployeeDto): Promise<Employee> {
    return this.prisma.employee.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Employee> {
    return this.prisma.employee.delete({ where: { id } });
  }

  async findById(id: string): Promise<Employee> {
    return this.prisma.employee.findUnique({ where: { id } });
  }
}
