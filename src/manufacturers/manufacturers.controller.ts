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
import { Role } from '../auth/role.enum';
import { RolesGuard } from '../auth/roles.guard';
import { GetUser } from '../users/get-user.decorator';
import { User } from '../users/user.entity';
import { CreateManufacturerDto } from './create-manufacturer.dto';
import { Manufacturer } from './manufacturer.entity';
import { ManufacturersService } from './manufacturers.service';
import { PaginationDto } from './pagination.dto';

@Controller('manufacturers')
export class ManufacturersController {
  private logger = new Logger('ManufacturersController');

  constructor(private manufacturersService: ManufacturersService) {}

  @Get()
  public getManufacturers(@Query(ValidationPipe) paginationDto: PaginationDto) {
    this.logger.verbose('Retrieving all manufacturers.');
    return this.manufacturersService.getManufacturers({
      ...paginationDto,
      limit: paginationDto.limit > 20 ? 20 : paginationDto.limit,
    });
  }

  @Post()
  @UseGuards(AuthGuard(), new RolesGuard(Role.Admin))
  public createManufacturer(
    @Body(ValidationPipe) createManufacturerDto: CreateManufacturerDto,
    @GetUser() user: User,
  ): Promise<Manufacturer> {
    this.logger.verbose(
      `User "${user.firstName} ${
        user.lastName
      }" creating new manufacturer. Data: ${JSON.stringify(
        createManufacturerDto,
      )}.`,
    );
    return this.manufacturersService.createManufacturer(
      createManufacturerDto,
      user,
    );
  }

  @Delete('/:id')
  @UseGuards(AuthGuard(), new RolesGuard(Role.Admin))
  public deleteManufacturer(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(
      `User "${user.id}" deleting manufacturer with ID "${id}".`,
    );
    return this.manufacturersService.deleteManufacturer(id, user);
  }
}
