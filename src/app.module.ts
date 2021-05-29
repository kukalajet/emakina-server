import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './users/users.module';
import { ListingsModule } from './listings/listings.module';
import { LocationsModule } from './locations/locations.module';
import { ColorsModule } from './colors/colors.module';
import { FuelsModule } from './fuels/fuels.module';
import { TransmissionsModule } from './transmissions/transmissions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UsersModule,
    ListingsModule,
    LocationsModule,
    ColorsModule,
    FuelsModule,
    TransmissionsModule,
  ],
})
export class AppModule {}
