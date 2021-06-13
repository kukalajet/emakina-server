import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/listings/pagination.dto';
import { User } from '../users/user.entity';
import { CreateLocationDto } from './create-location.dto';
import { Location } from './location.entity';
import { LocationRepository } from './locations.repository';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(LocationRepository)
    private locationRepository: LocationRepository,
  ) {}

  public async getLocations(paginationDto: PaginationDto): Promise<Location[]> {
    return this.locationRepository.getLocations(paginationDto);
  }

  public async deleteLocation(id: number, user: User): Promise<void> {
    const result = await this.locationRepository.delete({ id: id });
    if (result.affected === 0)
      throw new NotFoundException(`Location with ID "${id}" not found.`);
  }

  public async createLocation(
    createLocationDto: CreateLocationDto,
    user: User,
  ): Promise<Location> {
    return this.locationRepository.createLocation(createLocationDto, user);
  }
}
