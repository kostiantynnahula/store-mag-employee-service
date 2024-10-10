import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EmployeeModule } from './employee/employee.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EmployeeModule,
    PrismaModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
