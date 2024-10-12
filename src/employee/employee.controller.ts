import { Controller } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateEmployeeDto,
  UpdateEmployeeDto,
  ListQuery,
  EmployeeTopics,
} from 'store-mag-types';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly service: EmployeeService) {}

  @MessagePattern(EmployeeTopics.LIST_EMPLOYEE)
  async list(@Payload() query: ListQuery) {
    return await this.service.list(query);
  }

  @MessagePattern(EmployeeTopics.CREATE_EMPLOYEE)
  async create(@Payload() data: CreateEmployeeDto) {
    return await this.service.create(data);
  }

  @MessagePattern(EmployeeTopics.UPDATE_EMPLOYEE)
  async update(@Payload() data: UpdateEmployeeDto) {
    return await this.service.update(data);
  }

  @MessagePattern(EmployeeTopics.DELETE_EMPLOYEE)
  async delete(@Payload() id: string) {
    return await this.service.delete(id);
  }

  @MessagePattern(EmployeeTopics.FIND_EMPLOYEE)
  async findById(@Payload() id: string) {
    return await this.service.get(id);
  }
}
