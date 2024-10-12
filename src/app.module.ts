import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EmployeeModule } from './employee/employee.module';
import { ConfigModule } from '@nestjs/config';
import { StoreModule } from './store/store.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), EmployeeModule, StoreModule],
  controllers: [AppController],
})
export class AppModule {}
