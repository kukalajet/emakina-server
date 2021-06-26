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
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { User, GetUser } from '../users';
import { CreateListingDto } from './create-listing.dto';
import { Listing } from './listing.entity';
import { ListingsService } from './listings.service';
import { PaginationDto } from './pagination.dto';
import { SearchListingDto } from './search-listing.dto';
import { getImageFileFilter } from './utils';
import { FindOneParams } from './find-one.dto';
import { Role } from '../auth/role.enum';
import { RolesGuard } from '../auth/roles.guard';

@Controller('listings')
export class ListingsController {
  private logger = new Logger('ListingsController');

  constructor(private listingsService: ListingsService) {}

  @Get()
  public getListings(
    @Req() request: Request,
    @Query(ValidationPipe) paginationDto: PaginationDto,
  ): Promise<Listing[]> {
    this.logger.verbose(
      `Retrieve all listings. Data: ${JSON.stringify(paginationDto)}`,
    );

    const host = request.headers.host;
    return this.listingsService.getListings(
      {
        ...paginationDto,
        limit: paginationDto.limit > 20 ? 20 : paginationDto.limit,
      },
      host,
    );
  }

  @Get(':id')
  public getListingById(
    @Req() request: Request,
    @Param(ValidationPipe) params: FindOneParams,
  ): Promise<Listing> {
    const host = request.headers.host;
    return this.listingsService.getListingById(params.id, host);
  }

  @Post('searches')
  public getSeachedListings(
    @Req() request: Request,
    @Body(ValidationPipe) searchListingDto: SearchListingDto,
    @Query(ValidationPipe) paginationDto: PaginationDto,
  ): Promise<Listing[]> {
    this.logger.verbose(
      `Searching for listings. Query: ${JSON.stringify(searchListingDto)}.`,
    );

    const host = request.headers.host;
    return this.listingsService.searchListings(
      searchListingDto,
      {
        ...paginationDto,
        limit: paginationDto.limit > 20 ? 20 : paginationDto.limit,
      },
      host,
    );
  }

  @Post()
  @UseGuards(AuthGuard(), new RolesGuard(Role.User, Role.Admin))
  @UseInterceptors(
    FilesInterceptor('images', 6, {
      fileFilter: getImageFileFilter,
    }),
  )
  public createListing(
    // @Body(ValidationPipe) createListingDto: CreateListingDto,
    @Body() createListingDto: CreateListingDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
    // @UploadedFiles() images: Array<any>,
    @GetUser() user: User,
  ): Promise<Listing> {
    this.logger.verbose(
      `User with ID "${user.id}" creating a new listing. Data: ${JSON.stringify(
        createListingDto,
      )}.`,
    );
    return this.listingsService.createListing(createListingDto, images, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard(), new RolesGuard(Role.Admin))
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
