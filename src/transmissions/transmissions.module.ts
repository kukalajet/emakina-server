import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { TransmissionRepository } from './transmission.repository';
import { TransmissionsController } from './transmissions.controller';
import { TransmissionsService } from './transmissions.service';

@Module({
  imports: [TypeOrmModule.forFeature([TransmissionRepository]), AuthModule],
  controllers: [TransmissionsController],
  providers: [TransmissionsService],
})
export class TransmissionsModule {
  constructor() {
    const logger = new Logger('TransmissionsModule');
    logger.verbose('Creating TransmissionsModule');
  }
}
