import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { LocalCache } from 'src/utils/services/local-cache.service';

@Module({
  imports: [],
  providers: [EmployeeService, LocalCache],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
