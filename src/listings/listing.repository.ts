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
