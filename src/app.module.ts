import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EmployeeModule } from './employee/employee.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { Auth0Module } from './auth0/auth0.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EmployeeModule,
    PrismaModule,
    Auth0Module,
  ],
  controllers: [AppController],
})
export class AppModule {}
