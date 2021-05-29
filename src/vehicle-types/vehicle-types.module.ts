import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { VehicleTypesController } from './vehicle-types.controller';
import { VehicleTypesService } from './vehicle-types.service';
import { VehicleTypeRepository } from './vehicle-type.repository';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleTypeRepository]), AuthModule],
  controllers: [VehicleTypesController],
  providers: [VehicleTypesService],
})
export class VehicleTypesModule {}
