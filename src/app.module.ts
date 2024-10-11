import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EmployeeModule } from './employee/employee.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), EmployeeModule],
  controllers: [AppController],
})
export class AppModule {}
