import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from '../users';
import { EntityRepository, Repository } from 'typeorm';
import { Listing } from './listing.entity';
import { VehicleType } from '../vehicle-types';
import { Transmission } from '../transmissions';
import { Fuel } from '../fuels';
import { Plate } from '../plates';
import { Color } from '../colors';
import { Location } from '../locations';
import { Manufacturer } from '../manufacturers';
import { Model } from '../models';
import { Valute } from '../valutes';
import { ListingStatus } from './listing-status.enum';
import { SearchListingDto } from './search-listing.dto';

@EntityRepository(Listing)
export class ListingRepository extends Repository<Listing> {
  private logger = new Logger('ListingRepository');

  public async getListings(): Promise<Listing[]> {
    const query = this.createQueryBuilder('listing')
      .leftJoinAndSelect('listing.type', 'vehicle_type')
      .leftJoinAndSelect('listing.transmission', 'transmission')
      .leftJoinAndSelect('listing.fuel', 'fuel')
      .leftJoinAndSelect('listing.plate', 'plate')
      .leftJoinAndSelect('listing.color', 'color')
      .leftJoinAndSelect('listing.location', 'location')
      .leftJoinAndSelect('listing.manufacturer', 'manufacturer')
      .leftJoinAndSelect('listing.model', 'model')
      .leftJoinAndSelect('listing.valute', 'valute');

    try {
      const listings = await query.getMany();
      return listings;
    } catch (error) {
      this.logger.error(`Failed to get listings.`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  // TODO: Handle various valutes when querying.
  public async searchListings(
    searchListingDto: SearchListingDto,
  ): Promise<Listing[]> {
    const query = this.createQueryBuilder('listing')
      .leftJoinAndSelect('listing.type', 'vehicle_type')
      .leftJoinAndSelect('listing.transmission', 'transmission')
      .leftJoinAndSelect('listing.fuel', 'fuel')
      .leftJoinAndSelect('listing.plate', 'plate')
      .leftJoinAndSelect('listing.color', 'color')
      .leftJoinAndSelect('listing.location', 'location')
      .leftJoinAndSelect('listing.manufacturer', 'manufacturer')
      .leftJoinAndSelect('listing.model', 'model')
      .leftJoinAndSelect('listing.valute', 'valute');

    if (searchListingDto.manufacturerId) {
      query.andWhere('listing.manufacturerId = :manufacturerId', {
        manufacturerId: searchListingDto.manufacturerId,
      });
    }

    if (searchListingDto.modelId) {
      query.andWhere('listing.modelId = :modelId', {
        modelId: searchListingDto.modelId,
      });
    }

    if (searchListingDto.fuelId) {
      query.andWhere('listing.fuelId = :fuelId', {
        fuelId: searchListingDto.fuelId,
      });
    }

    if (searchListingDto.transmissionId) {
      query.andWhere('listing.transmissionId = :transmissionId', {
        transmissionId: searchListingDto.transmissionId,
      });
    }

    if (searchListingDto.valuteId) {
      query.andWhere('listing.valuteId = :valuteId', {
        valuteId: searchListingDto.valuteId,
      });
    }

    if (searchListingDto.matriculation?.length) {
      if (searchListingDto.matriculation[0]) {
        query.andWhere('listing.year > :matriculation', {
          matriculation: searchListingDto.matriculation[0],
        });
      }

      if (searchListingDto.matriculation[1]) {
        query.andWhere('listing.year < :matriculation', {
          matriculation: searchListingDto.matriculation[1],
        });
      }
    }

    if (searchListingDto.price?.length) {
      if (searchListingDto.price[0]) {
        query.andWhere('listing.price > :price', {
          price: searchListingDto.price[0],
        });
      }

      if (searchListingDto.price[1]) {
        query.andWhere('listing.price < :price', {
          price: searchListingDto.price[1],
        });
      }
    }

    try {
      const listings = await query.getMany();
      return listings;
    } catch (error) {
      this.logger.error(`Failed to search for listings.`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  public async createListing(
    title: string,
    description: string,
    type: VehicleType,
    transmission: Transmission,
    year: number,
    mileage: number,
    fuel: Fuel,
    plate: Plate,
    color: Color,
    location: Location,
    manufacturer: Manufacturer,
    model: Model,
    price: number,
    valute: Valute,
    user: User,
  ) {
    const listing = new Listing();
    listing.title = title;
    listing.description = description;
    listing.type = type;
    listing.transmission = transmission;
    listing.year = year;
    listing.mileage = mileage;
    listing.fuel = fuel;
    listing.plate = plate;
    listing.color = color;
    listing.location = location;
    listing.manufacturer = manufacturer;
    listing.model = model;
    listing.price = price;
    listing.valute = valute;
    listing.status = ListingStatus.AVAILABLE;
    listing.user = user;

    try {
      await listing.save();
    } catch (error) {
      this.logger.error(
        `Failed to create listing by user "${user.firstName} ${
          user.lastName
        }". Data: ${JSON.stringify(listing)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    delete listing.user;

    return listing;
  }
}
