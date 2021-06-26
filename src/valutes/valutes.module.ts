import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ValuteRepository } from './valute.repository';
import { ValutesController } from './valutes.controller';
import { ValutesService } from './valutes.service';

@Module({
  imports: [TypeOrmModule.forFeature([ValuteRepository]), AuthModule],
  controllers: [ValutesController],
  providers: [ValutesService],
})
export class ValutesModule {
  constructor() {
    const logger = new Logger('ValutesModule');
    logger.verbose('Creating ValutesModule');
  }
}
