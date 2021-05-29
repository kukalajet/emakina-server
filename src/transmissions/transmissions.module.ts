import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TransmissionRepository } from './transmission.repository';
import { TransmissionsController } from './transmissions.controller';
import { TransmissionsService } from './transmissions.service';

@Module({
  imports: [TypeOrmModule.forFeature([TransmissionRepository]), AuthModule],
  controllers: [TransmissionsController],
  providers: [TransmissionsService],
})
export class TransmissionsModule {}
