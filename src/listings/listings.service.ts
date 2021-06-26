import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationRepository } from '../locations/locations.repository';
import { ManufacturerRepository } from '../manufacturers/manufacturer.repository';
import { ColorRepository } from '../colors/color.repository';
import { FuelRepository } from '../fuels/fuels.repository';
import { PlateRepository } from '../plates/plate.repository';
import { TransmissionRepository } from '../transmissions/transmission.repository';
import { User } from '../users';
import { VehicleTypeRepository } from '../vehicle-types/vehicle-type.repository';
import { CreateListingDto } from './create-listing.dto';
import { Listing } from './listing.entity';
import { ListingRepository } from './listing.repository';
import { ModelRepository } from '../models/model.repository';
import { ValuteRepository } from '../valutes/valute.repository';
import { SearchListingDto } from './search-listing.dto';
import { PaginationDto } from './pagination.dto';

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(ListingRepository)
    private listingRepository: ListingRepository,
    @InjectRepository(TransmissionRepository)
    private transmissionRepository: TransmissionRepository,
    @InjectRepository(VehicleTypeRepository)
    private vehicleTypeRepository: VehicleTypeRepository,
    @InjectRepository(FuelRepository) private fuelRepository: FuelRepository,
    @InjectRepository(PlateRepository)
    private plateRepository: PlateRepository,
    @InjectRepository(ColorRepository)
    private colorRepository: ColorRepository,
    @InjectRepository(LocationRepository)
    private locationRepository: LocationRepository,
    @InjectRepository(ManufacturerRepository)
    private manufacturerRepository: ManufacturerRepository,
    @InjectRepository(ModelRepository)
    private modelRepository: ModelRepository,
    @InjectRepository(ValuteRepository)
    private valuteRepository: ValuteRepository,
  ) {}

  public async getListings(
    paginationDto: PaginationDto,
    host: string,
  ): Promise<Listing[]> {
    return this.listingRepository.getListings(paginationDto, host);
  }

  public async searchListings(
    searchListingDto: SearchListingDto,
    paginationDto: PaginationDto,
    host: string,
  ): Promise<Listing[]> {
    return this.listingRepository.searchListings(
      searchListingDto,
      paginationDto,
      host,
    );
  }

  public async getListingById(id: number, host: string): Promise<Listing> {
    return this.listingRepository.getListingById(id, host);
  }

  public async deleteListing(id: number, user: User): Promise<void> {
    const result = await this.listingRepository.delete({ id: id });
    if (result.affected === 0)
      throw new NotFoundException(`Listing with ID "${id}" not found.`);
  }

  public async createListing(
    createListingDto: CreateListingDto,
    images: Array<Express.Multer.File>,
    // images: Array<any>,
    user: User,
  ): Promise<Listing> {
    const type = await this.vehicleTypeRepository.findOne({
      id: createListingDto.type.id,
    });
    if (!type) {
      throw new NotFoundException(
        `VehicleType with ID "${createListingDto.type.id}" not found.`,
      );
    }

    const transmission = await this.transmissionRepository.findOne({
      id: createListingDto.transmission.id,
    });
    if (!transmission) {
      throw new NotFoundException(
        `Transmission with ID "${createListingDto.transmission.id}" not found.`,
      );
    }

    const fuel = await this.fuelRepository.findOne({
      id: createListingDto.fuel.id,
    });
    if (!fuel) {
      throw new NotFoundException(
        `Fuel with ID: "${createListingDto.fuel.id}" not found.`,
      );
    }

    const plate = await this.plateRepository.findOne({
      id: createListingDto.plate.id,
    });
    if (!plate) {
      throw new NotFoundException(
        `Plate with ID: "${createListingDto.plate.id}" not found.`,
      );
    }

    const color = await this.colorRepository.findOne({
      id: createListingDto.color.id,
    });
    if (!color) {
      throw new NotFoundException(
        `Color with ID: "${createListingDto.color.id}" not found.`,
      );
    }

    const location = await this.locationRepository.findOne({
      id: createListingDto.location.id,
    });
    if (!location) {
      throw new NotFoundException(
        `Location with ID: "${createListingDto.location.id}" not found.`,
      );
    }

    const manufacturer = await this.manufacturerRepository.findOne({
      id: createListingDto.manufacturer.id,
    });
    if (!manufacturer) {
      throw new NotFoundException(
        `Manufacturer with ID: "${createListingDto.manufacturer.id}" not found.`,
      );
    }

    const model = await this.modelRepository.findOne({
      id: createListingDto.model.id,
    });
    if (!model) {
      throw new NotFoundException(
        `Model with ID: "${createListingDto.model.id}" not found.`,
      );
    }

    const valute = await this.valuteRepository.findOne({
      id: createListingDto.valute.id,
    });
    if (!valute) {
      throw new NotFoundException(
        `Valute with ID: "${createListingDto.valute.id}" not found.`,
      );
    }

    return this.listingRepository.createListing(
      createListingDto.title,
      createListingDto.description,
      type,
      transmission,
      createListingDto.year,
      createListingDto.mileage,
      fuel,
      plate,
      color,
      location,
      manufacturer,
      model,
      createListingDto.price,
      valute,
      images,
      user,
    );
  }
}
