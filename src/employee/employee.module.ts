import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { LocalCache } from 'src/utils/services/local-cache.service';
import { Auth0Service } from 'src/utils/services/auth0.service';
import { StoreModule } from 'src/store/store.module';

@Module({
  imports: [StoreModule],
  providers: [EmployeeService, LocalCache, Auth0Service],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
