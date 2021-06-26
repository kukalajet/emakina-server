import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './users/users.module';
import { ListingsModule } from './listings/listings.module';
import { LocationsModule } from './locations/locations.module';
import { ColorsModule } from './colors/colors.module';
import { FuelsModule } from './fuels/fuels.module';
import { TransmissionsModule } from './transmissions/transmissions.module';
import { PlatesModule } from './plates/plates.module';
import { VehicleTypesModule } from './vehicle-types/vehicle-types.module';
import { ValutesModule } from './valutes/valutes.module';
import { ManufacturersModule } from './manufacturers/manufacturers.module';
import { ModelsModule } from './models/models.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    ListingsModule,
    UsersModule,
    LocationsModule,
    ColorsModule,
    FuelsModule,
    TransmissionsModule,
    PlatesModule,
    VehicleTypesModule,
    ValutesModule,
    ManufacturersModule,
    ModelsModule,
    MulterModule.register({
      dest: './files',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
})
export class AppModule {
  constructor() {
    const logger = new Logger('AppModule');
    logger.verbose('Creating AppModule');
  }
}
