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
import { GetUser } from '../users/get-user.decorator';
import { User } from '../users/user.entity';
import { CreateLocationDto } from './create-location.dto';
import { Location } from './location.entity';
import { LocationsService } from './locations.service';
import { PaginationDto } from './pagination.dto';

@Controller('locations')
export class LocationsController {
  private logger = new Logger('LocationsController');

  constructor(private locationsService: LocationsService) {}

  @Get()
  public getLocations(
    @Query(ValidationPipe) paginationDto: PaginationDto,
  ): Promise<Location[]> {
    this.logger.verbose(
      `Retrieving all locations. Query: ${JSON.stringify(paginationDto)}`,
    );
    return this.locationsService.getLocations({
      ...paginationDto,
      limit: paginationDto.limit > 20 ? 20 : paginationDto.limit,
    });
  }

  @Post()
  @UseGuards(AuthGuard())
  public createLocation(
    @Body(ValidationPipe) createLocationDto: CreateLocationDto,
    @GetUser() user: User,
  ): Promise<Location> {
    this.logger.verbose(
      `User "${user.firstName} ${
        user.lastName
      }" creating new location. Data: ${JSON.stringify(createLocationDto)}.`,
    );
    return this.locationsService.createLocation(createLocationDto, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  public deleteLocation(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(`User "${user.id}" deleting location with ID "${id}".`);
    return this.locationsService.deleteLocation(id, user);
  }
}
