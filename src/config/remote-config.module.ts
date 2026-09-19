import { Module } from '@nestjs/common';
import { RemoteConfigController } from './remote-config.controller';
import { RemoteConfigService } from './remote-config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [RemoteConfigController],
  providers: [RemoteConfigService],
  exports: [RemoteConfigService],
})
export class RemoteConfigModule {}
