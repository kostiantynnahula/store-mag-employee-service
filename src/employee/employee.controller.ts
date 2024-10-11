import { Controller } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Auth0Service } from 'src/auth0/auth0.service';

@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly service: EmployeeService,
    private readonly auth0Service: Auth0Service,
  ) {}

  @MessagePattern('employee.list')
  async list() {
    return await this.auth0Service.getUsers();
  }

  @MessagePattern('employee.create')
  async create(@Payload() data: CreateEmployeeDto) {
    return await this.auth0Service.createUser(data);
  }

  @MessagePattern('employee.update')
  async update(@Payload() data: UpdateEmployeeDto) {
    return await this.auth0Service.updateUser(data);
  }

  @MessagePattern('employee.delete')
  async delete(@Payload() id: string) {
    return await this.auth0Service.deleteUser(id);
  }

  @MessagePattern('employee.findById')
  async findById(@Payload() id: string) {
    return await this.auth0Service.getUser(id);
  }
}
