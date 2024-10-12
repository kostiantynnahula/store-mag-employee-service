import { Controller } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateEmployeeDto,
  UpdateEmployeeDto,
  ListQuery,
  EmployeeTopics,
  badRequest,
} from 'store-mag-types';
import { StoreService } from 'src/store/store.service';

@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly service: EmployeeService,
    private readonly storeService: StoreService,
  ) {}

  @MessagePattern(EmployeeTopics.LIST_EMPLOYEE)
  async list(@Payload() query: ListQuery) {
    return await this.service.list(query);
  }

  @MessagePattern(EmployeeTopics.CREATE_EMPLOYEE)
  async create(@Payload() data: CreateEmployeeDto) {
    if (data.storeId) {
      const store = await this.storeService.findById(data.storeId);

      if (!store) {
        return badRequest('Store is not correct');
      }
    }

    return await this.service.create(data);
  }

  @MessagePattern(EmployeeTopics.UPDATE_EMPLOYEE)
  async update(@Payload() data: UpdateEmployeeDto) {
    const employee = await this.service.get(data.id);

    if (!employee) {
      return badRequest('Employee not found');
    }

    return await this.service.update(data);
  }

  @MessagePattern(EmployeeTopics.DELETE_EMPLOYEE)
  async delete(@Payload() id: string) {
    const employee = await this.service.get(id);

    if (!employee) {
      return badRequest('Employee not found');
    }

    return await this.service.delete(id);
  }

  @MessagePattern(EmployeeTopics.FIND_EMPLOYEE)
  async findById(@Payload() id: string) {
    const employee = await this.service.get(id);

    if (!employee) {
      return badRequest('Employee not found');
    }

    return employee;
  }
}
