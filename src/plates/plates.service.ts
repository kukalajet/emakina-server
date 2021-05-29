import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { CreatePlateDto } from './create-plate.dto';
import { Plate } from './plate.entity';
import { PlateRepository } from './plate.repository';

@Injectable()
export class PlatesService {
  constructor(
    @InjectRepository(PlateRepository)
    private plateRepository: PlateRepository,
  ) {}

  public async getPlates(): Promise<Plate[]> {
    return this.plateRepository.getPlates();
  }

  public async deletePlate(id: number, user: User): Promise<void> {
    const result = await this.plateRepository.delete({ id: id });
    if (result.affected === 0)
      throw new NotFoundException(`Plate with ID "${id}" not found.`);
  }

  public async createPlate(
    createPlateDto: CreatePlateDto,
    user: User,
  ): Promise<Plate> {
    return this.plateRepository.createPlate(createPlateDto, user);
  }
}
