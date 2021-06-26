import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { PlateRepository } from './plate.repository';
import { PlatesController } from './plates.controller';
import { PlatesService } from './plates.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlateRepository]), AuthModule],
  controllers: [PlatesController],
  providers: [PlatesService],
})
export class PlatesModule {
  constructor() {
    const logger = new Logger('PlatesModule');
    logger.verbose('Creating PlatesModule');
  }
}
