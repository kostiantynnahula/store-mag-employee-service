import { Controller } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly service: EmployeeService) {}

  @MessagePattern('employee.list')
  async list() {
    return this.service.list();
  }

  @MessagePattern('employee.create')
  async create(@Payload() data: CreateEmployeeDto) {
    console.log(data);
    return this.service.create(data);
  }

  @MessagePattern('employee.update')
  async update(@Payload() data: UpdateEmployeeDto) {
    return this.service.update(data);
  }

  @MessagePattern('employee.delete')
  async delete(@Payload() id: string) {
    return this.service.delete(id);
  }

  @MessagePattern('employee.findById')
  async findById(@Payload() id: string) {
    return this.service.findById(id);
  }
}
