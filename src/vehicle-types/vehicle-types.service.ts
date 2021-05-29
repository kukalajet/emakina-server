import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { CreateVehicleTypeDto } from './create-vehicle-type.dto';
import { VehicleType } from './vehicle-type.entity';
import { VehicleTypeRepository } from './vehicle-type.repository';

@Injectable()
export class VehicleTypesService {
  constructor(
    @InjectRepository(VehicleTypeRepository)
    private vehicleTypeRepository: VehicleTypeRepository,
  ) {}

  public async getVehicleTypes(): Promise<VehicleType[]> {
    return this.vehicleTypeRepository.getVehicleTypes();
  }

  public async deleteVehicleType(id: number, user: User): Promise<void> {
    const result = await this.vehicleTypeRepository.delete({ id: id });
    if (result.affected === 0)
      throw new NotFoundException(`Type with ID "${id}" not found.`);
  }

  public async createVehicleType(
    createVehicleTypeDto: CreateVehicleTypeDto,
    user: User,
  ): Promise<VehicleType> {
    return this.vehicleTypeRepository.createVehicleType(
      createVehicleTypeDto,
      user,
    );
  }
}
