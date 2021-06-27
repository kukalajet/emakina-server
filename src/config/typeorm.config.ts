import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import { Color } from '../colors';
import { Fuel } from '../fuels';
import { Listing } from '../listings';
import { Location } from '../locations';
import { Manufacturer } from '../manufacturers';
import { Model } from '../models';
import { Plate } from '../plates';
import { Transmission } from '../transmissions';
import { Valute } from '../valutes';
import { VehicleType } from '../vehicle-types';
import { User } from '../users';

const dbConfig = config.get('db');

const entities = [__dirname + '/../**/*.entity.{js,ts}'];
console.log(entities);

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RDS_PORT || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  // entities: [__dirname + '/../**/*.entity.{js,ts}'],
  entities: [
    User,
    Color,
    Fuel,
    Listing,
    Location,
    Manufacturer,
    Model,
    Plate,
    Transmission,
    Valute,
    VehicleType,
  ],
  synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
  ssl: {
    rejectUnauthorized: false,
  },
};
