import { Module } from '@nestjs/common';
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
export class FuelsModule {}
