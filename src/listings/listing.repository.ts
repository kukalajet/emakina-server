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
import { PaginationDto } from './pagination.dto';
import { writeFile, getExtension, getFilesInFolder } from './utils/file-system';

@EntityRepository(Listing)
export class ListingRepository extends Repository<Listing> {
  private logger = new Logger('ListingRepository');

  public async getListings(
    paginationDto: PaginationDto,
    host: string,
  ): Promise<Listing[]> {
    const skippedItems = (paginationDto.page - 1) * paginationDto.limit;
    // const totalCount = await this.count();

    const query = this.createQueryBuilder('listing')
      // .orderBy('createdAt', 'DESC')
      .offset(skippedItems)
      .limit(paginationDto.limit)
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

      await Promise.all(
        listings.map(async listing => {
          const files = await getFilesInFolder(`/public/${listing.id}`);
          const images = files.map(file => `${host}/${listing.id}/${file}`);
          listing.images = images;
        }),
      );

      return listings;
    } catch (error) {
      this.logger.error(`Failed to get listings.`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  public async getListingById(id: number, host: string): Promise<Listing> {
    const query = this.createQueryBuilder('listing')
      .leftJoinAndSelect('listing.type', 'vehicle_type')
      .leftJoinAndSelect('listing.transmission', 'transmission')
      .leftJoinAndSelect('listing.fuel', 'fuel')
      .leftJoinAndSelect('listing.plate', 'plate')
      .leftJoinAndSelect('listing.color', 'color')
      .leftJoinAndSelect('listing.location', 'location')
      .leftJoinAndSelect('listing.manufacturer', 'manufacturer')
      .leftJoinAndSelect('listing.model', 'model')
      .leftJoinAndSelect('listing.valute', 'valute')
      .andWhere('listing.id = :id', { id });

    try {
      const listing = await query.getOne();

      const files = await getFilesInFolder(`/public/${listing.id}`);
      const images = files.map(file => `${host}/${listing.id}/${file}`);
      listing.images = images;

      return listing;
    } catch (error) {
      this.logger.error(`Failed to search for listings.`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  // TODO: Handle various valutes when querying.
  public async searchListings(
    searchListingDto: SearchListingDto,
    paginationDto: PaginationDto,
    host: string,
  ): Promise<Listing[]> {
    // const totalCount = await this.count();

    const query = this.createQueryBuilder('listing')
      // .orderBy('createdAt', 'DESC')
      .leftJoinAndSelect('listing.type', 'vehicle_type')
      .leftJoinAndSelect('listing.transmission', 'transmission')
      .leftJoinAndSelect('listing.fuel', 'fuel')
      .leftJoinAndSelect('listing.plate', 'plate')
      .leftJoinAndSelect('listing.color', 'color')
      .leftJoinAndSelect('listing.location', 'location')
      .leftJoinAndSelect('listing.manufacturer', 'manufacturer')
      .leftJoinAndSelect('listing.model', 'model')
      .leftJoinAndSelect('listing.valute', 'valute');

    if (paginationDto?.limit && paginationDto?.page) {
      const skippedItems = (paginationDto.page - 1) * paginationDto.limit;
      query.offset(skippedItems);
      query.limit(paginationDto.limit);
    }

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

    if (searchListingDto.ids?.length) {
      query.andWhere('listing.id IN (:...ids)', { ids: searchListingDto.ids });
    }

    try {
      const listings = await query.getMany();

      await Promise.all(
        listings.map(async listing => {
          const files = await getFilesInFolder(`/public/${listing.id}`);
          const images = files.map(file => `${host}/${listing.id}/${file}`);
          listing.images = images;
        }),
      );

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
    images: Array<Express.Multer.File>,
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

    if (images?.length) {
      images.forEach((image, index) => {
        const ext = getExtension(image.originalname);
        console.log(`ext: ${ext}`);
        const folder = listing.id;
        const filename = index;

        writeFile(`/public/${folder}`, filename.toString(), ext, image.buffer);
      });
    }

    delete listing.user;
    if (listing.type) delete listing.type.listings;
    if (listing.transmission) delete listing.transmission.listings;
    if (listing.fuel) delete listing.fuel.listings;
    if (listing.plate) delete listing.plate.listings;
    if (listing.color) delete listing.color.listings;
    if (listing.location) delete listing.location.listings;
    if (listing.manufacturer) delete listing.manufacturer.listings;
    if (listing.model) {
      delete listing.model.listings;
      delete listing.model.manufacturer;
    }
    if (listing.valute) delete listing.valute.listings;

    return listing;
  }
}
