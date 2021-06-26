import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { FuelsController } from './fuels.controller';
import { FuelRepository } from './fuels.repository';
import { FuelsService } from './fuels.service';

@Module({
  imports: [TypeOrmModule.forFeature([FuelRepository]), AuthModule],
  controllers: [FuelsController],
  providers: [FuelsService],
})
export class FuelsModule {
  constructor() {
    const logger = new Logger('FuelsModule');
    logger.verbose('Creating FuelsModule');
  }
}
