import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users';
import { CreateFuelDto } from './create-fuel.dto';
import { Fuel } from './fuel.entity';
import { FuelRepository } from './fuels.repository';

@Injectable()
export class FuelsService {
  constructor(
    @InjectRepository(FuelRepository) private fuelRepository: FuelRepository,
  ) {}

  public async getFuels(): Promise<Fuel[]> {
    return this.fuelRepository.getFuels();
  }

  public async deleteFuel(id: number, user: User): Promise<void> {
    const result = await this.fuelRepository.delete({ id: id });
    if (result.affected === 0)
      throw new NotFoundException(`Fuel with ID "${id}" not found.`);
  }

  public async createFuel(
    createFuelDto: CreateFuelDto,
    user: User,
  ): Promise<Fuel> {
    return this.fuelRepository.createFuel(createFuelDto, user);
  }
}
