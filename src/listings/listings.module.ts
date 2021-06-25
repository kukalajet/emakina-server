import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransmissionRepository } from '../transmissions/transmission.repository';
import { TransmissionsModule } from '../transmissions/transmissions.module';
import { AuthModule } from '../auth/auth.module';
import { ListingRepository } from './listing.repository';
import { ListingsController } from './listings.controller';
import { ListingsService } from './listings.service';
import { VehicleTypeRepository } from '../vehicle-types/vehicle-type.repository';
import { VehicleTypesModule } from '../vehicle-types/vehicle-types.module';
import { FuelsModule } from '../fuels/fuels.module';
import { FuelRepository } from '../fuels/fuels.repository';
import { PlatesModule } from '../plates/plates.module';
import { PlateRepository } from '../plates/plate.repository';
import { ColorsModule } from '../colors/colors.module';
import { ColorRepository } from '../colors/color.repository';
import { LocationsModule } from '../locations/locations.module';
import { LocationRepository } from '../locations/locations.repository';
import { ManufacturersModule } from '../manufacturers/manufacturers.module';
import { ManufacturerRepository } from '../manufacturers/manufacturer.repository';
import { ModelsModule } from '../models/models.module';
import { ModelRepository } from '../models/model.repository';
import { ValutesModule } from '../valutes/valutes.module';
import { ValuteRepository } from '../valutes/valute.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ListingRepository]),
    AuthModule,
    TypeOrmModule.forFeature([VehicleTypeRepository]),
    VehicleTypesModule,
    TypeOrmModule.forFeature([TransmissionRepository]),
    TransmissionsModule,
    TypeOrmModule.forFeature([FuelRepository]),
    FuelsModule,
    TypeOrmModule.forFeature([PlateRepository]),
    PlatesModule,
    TypeOrmModule.forFeature([ColorRepository]),
    ColorsModule,
    TypeOrmModule.forFeature([LocationRepository]),
    LocationsModule,
    TypeOrmModule.forFeature([ManufacturerRepository]),
    ManufacturersModule,
    TypeOrmModule.forFeature([ModelRepository]),
    ModelsModule,
    TypeOrmModule.forFeature([ValuteRepository]),
    ValutesModule,
  ],
  controllers: [ListingsController],
  providers: [ListingsService],
})
export class ListingsModule {}
