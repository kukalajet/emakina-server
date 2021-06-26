import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ManufacturerRepository } from './manufacturer.repository';
import { ManufacturersController } from './manufacturers.controller';
import { ManufacturersService } from './manufacturers.service';

@Module({
  imports: [TypeOrmModule.forFeature([ManufacturerRepository]), AuthModule],
  controllers: [ManufacturersController],
  providers: [ManufacturersService],
})
export class ManufacturersModule {
  constructor() {
    const logger = new Logger('ManufacturersModule');
    logger.verbose('Creating ManufacturersModule');
  }
}
