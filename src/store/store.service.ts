import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { StoreTopics, Store } from 'store-mag-types';

@Injectable()
export class StoreService {
  constructor(@Inject('STORE_SERVICE') private readonly client: ClientKafka) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf(StoreTopics.FIND_STORE);
    await this.client.connect();
  }

  async findById(id: string): Promise<Store> {
    const store$ = this.client.send<Store>(StoreTopics.FIND_STORE, id);
    return await firstValueFrom(store$); // Convert the Observable to a Promise
  }
}
