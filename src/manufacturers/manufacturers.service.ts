import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { CreateManufacturerDto } from './create-manufacturer.dto';
import { Manufacturer } from './manufacturer.entity';
import { ManufacturerRepository } from './manufacturer.repository';
import { PaginationDto } from './pagination.dto';

@Injectable()
export class ManufacturersService {
  constructor(
    @InjectRepository(ManufacturerRepository)
    private manufacturerRepository: ManufacturerRepository,
  ) {}

  public async getManufacturers(
    paginationDto: PaginationDto,
  ): Promise<Manufacturer[]> {
    return this.manufacturerRepository.getManufacturers(paginationDto);
  }

  public async deleteManufacturer(id: number, user: User): Promise<void> {
    const result = await this.manufacturerRepository.delete({ id: id });
    if (result.affected === 0)
      throw new NotFoundException(`Manufacturer with ID "${id}" not found.`);
  }

  public async createManufacturer(
    createManufacturerDto: CreateManufacturerDto,
    user: User,
  ): Promise<Manufacturer> {
    return this.manufacturerRepository.createManufacturer(
      createManufacturerDto,
      user,
    );
  }
}
