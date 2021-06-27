import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RDS_PORT || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
  ssl: {
    rejectUnauthorized: false,
  },

  url:
    'postgres://xrlxglfdxqrvza:af653576792755e3ecb9978519ca558c1debfbab91921fa5239f4b661fa3f52f@ec2-99-80-200-225.eu-west-1.compute.amazonaws.com:5432/d2on2n7b0o9oh0',
};
