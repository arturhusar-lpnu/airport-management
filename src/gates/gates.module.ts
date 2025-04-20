import { Module } from '@nestjs/common';
import { GatesController } from './gates.controller';
import { GatesService } from './gates.service';

@Module({
  controllers: [GatesController],
  providers: [GatesService]
})
export class GatesModule {}
