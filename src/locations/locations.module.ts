import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { LocationsController } from './locations.controller';
import { LocationRepository } from './locations.repository';
import { LocationsService } from './locations.service';

@Module({
  imports: [TypeOrmModule.forFeature([LocationRepository]), AuthModule],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {
  constructor() {
    const logger = new Logger('LocationsModule');
    logger.verbose('Creating LocationsModule');
  }
}
