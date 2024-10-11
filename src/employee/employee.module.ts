import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { Auth0Module } from 'src/auth0/auth0.module';

@Module({
  imports: [Auth0Module, PrismaModule],
  providers: [EmployeeService],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
