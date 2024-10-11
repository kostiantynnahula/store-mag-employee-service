import { Controller } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Auth0Service } from 'src/auth0/auth0.service';
import {
  CreateEmployeeDto,
  UpdateEmployeeDto,
  ListEmployeeQuery,
  EmployeeTopics,
} from 'store-mag-types';

@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly service: EmployeeService,
    private readonly auth0Service: Auth0Service,
  ) {}

  @MessagePattern(EmployeeTopics.LIST_EMPLOYEE)
  async list(@Payload() query: ListEmployeeQuery) {
    return await this.auth0Service.getUsers();
  }

  @MessagePattern(EmployeeTopics.CREATE_EMPLOYEE)
  async create(@Payload() data: CreateEmployeeDto) {
    return await this.auth0Service.createUser(data);
  }

  @MessagePattern(EmployeeTopics.UPDATE_EMPLOYEE)
  async update(@Payload() data: UpdateEmployeeDto) {
    return await this.auth0Service.updateUser(data);
  }

  @MessagePattern(EmployeeTopics.DELETE_EMPLOYEE)
  async delete(@Payload() id: string) {
    return await this.auth0Service.deleteUser(id);
  }

  @MessagePattern(EmployeeTopics.FIND_EMPLOYEE)
  async findById(@Payload() id: string) {
    return await this.auth0Service.getUser(id);
  }
}
