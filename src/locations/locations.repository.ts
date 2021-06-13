import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from '../users';
import { EntityRepository, Repository } from 'typeorm';
import { CreateLocationDto } from './create-location.dto';
import { Location } from './location.entity';
import { PaginationDto } from './pagination.dto';

@EntityRepository(Location)
export class LocationRepository extends Repository<Location> {
  private logger = new Logger('LocationRepository');

  public async getLocations(paginationDto: PaginationDto): Promise<Location[]> {
    const skippedItems = (paginationDto.page - 1) * paginationDto.limit;
    // const totalCount = await this.count();

    const query = this.createQueryBuilder('location')
      // .orderBy('createdAt', 'DESC')
      .offset(skippedItems)
      .limit(paginationDto.limit);

    try {
      const locations = await query.getMany();
      return locations;
    } catch (error) {
      this.logger.error(`Failed to get locations.`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  public async createLocation(
    createLocationDto: CreateLocationDto,
    user: User,
  ) {
    const { name } = createLocationDto;

    const location = new Location();
    location.name = name;

    try {
      await location.save();
    } catch (error) {
      this.logger.error(
        `Failed to create location by user "${user.firstName} ${
          user.lastName
        }". Data: ${JSON.stringify(createLocationDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    return location;
  }
}
