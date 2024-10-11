import { Module } from '@nestjs/common';
import { Auth0Service } from './auth0.service';
import { LocalCache } from 'src/utils/services/local-cache.service';

@Module({
  providers: [Auth0Service, LocalCache],
  exports: [Auth0Service],
})
export class Auth0Module {}
