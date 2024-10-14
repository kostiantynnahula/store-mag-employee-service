import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { LocalCache } from 'src/utils/services/local-cache.service';

@Module({
  providers: [RoleService, LocalCache],
  exports: [RoleService],
})
export class RoleModule {}
