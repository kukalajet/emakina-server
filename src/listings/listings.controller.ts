import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User, GetUser } from '../users';
import { CreateListingDto } from './create-listing.dto';
import { Listing } from './listing.entity';
import { ListingsService } from './listings.service';
import { PaginatedListingsDto } from './paginated-listings.dto';
import { PaginationDto } from './pagination.dto';
import { SearchListingDto } from './search-listing.dto';

@Controller('listings')
export class ListingsController {
  private logger = new Logger('ListingsController');

  constructor(private listingsService: ListingsService) {}

  @Get()
  public getListings(
    @Query(ValidationPipe) paginationDto: PaginationDto,
  ): Promise<Listing[]> {
    this.logger.verbose(
      `Retrieve all listings. Data: ${JSON.stringify(paginationDto)}`,
    );

    return this.listingsService.getListings({
      ...paginationDto,
      limit: paginationDto.limit > 20 ? 20 : paginationDto.limit,
    });
  }

  @Post('searches')
  public getSeachedListings(
    @Body(ValidationPipe) searchListingDto: SearchListingDto,
  ): Promise<Listing[]> {
    this.logger.verbose(
      `Searching for listings. Query: ${JSON.stringify(searchListingDto)}.`,
    );
    return this.listingsService.searchListings(searchListingDto);
  }

  @Post()
  @UseGuards(AuthGuard())
  public createListing(
    @Body(ValidationPipe) createListingDto: CreateListingDto,
    @GetUser() user: User,
  ): Promise<Listing> {
    this.logger.verbose(
      `User with ID "${user.id}" creating a new listing. Data: ${JSON.stringify(
        createListingDto,
      )}.`,
    );
    return this.listingsService.createListing(createListingDto, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  public deleteListing(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(
      `User with ID "${user.id}" deleting listing with ID "${id}".`,
    );
    return this.listingsService.deleteListing(id, user);
  }
}
