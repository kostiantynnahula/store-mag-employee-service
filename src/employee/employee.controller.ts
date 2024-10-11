import { Controller } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateEmployeeDto,
  UpdateEmployeeDto,
  ListEmployeeQuery,
  EmployeeTopics,
} from 'store-mag-types';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly service: EmployeeService) {}

  @MessagePattern(EmployeeTopics.LIST_EMPLOYEE)
  async list(@Payload() query: ListEmployeeQuery) {
    return await this.service.getUsers();
  }

  @MessagePattern(EmployeeTopics.CREATE_EMPLOYEE)
  async create(@Payload() data: CreateEmployeeDto) {
    return await this.service.createUser(data);
  }

  @MessagePattern(EmployeeTopics.UPDATE_EMPLOYEE)
  async update(@Payload() data: UpdateEmployeeDto) {
    return await this.service.updateUser(data);
  }

  @MessagePattern(EmployeeTopics.DELETE_EMPLOYEE)
  async delete(@Payload() id: string) {
    return await this.service.deleteUser(id);
  }

  @MessagePattern(EmployeeTopics.FIND_EMPLOYEE)
  async findById(@Payload() id: string) {
    return await this.service.getUser(id);
  }
}
