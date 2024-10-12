import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'STORE_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'store',
              brokers: ['localhost:9092'],
            },
            consumer: {
              groupId: configService.get('KAFKA_STORE_GROUP_ID'),
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [StoreService],
  exports: [StoreService],
})
export class StoreModule {}
