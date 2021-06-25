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
import { CreatePlateDto } from './create-plate.dto';
import { PaginationDto } from './pagination.dto';
import { Plate } from './plate.entity';
import { PlatesService } from './plates.service';

@Controller('plates')
export class PlatesController {
  private logger = new Logger('PlatesController');

  constructor(private platesService: PlatesService) {}

  @Get()
  public getPlates(@Query(ValidationPipe) paginationDto: PaginationDto) {
    this.logger.verbose('Retrieving all plates.');
    return this.platesService.getPlates({
      ...paginationDto,
      limit: paginationDto.limit > 20 ? 20 : paginationDto.limit,
    });
  }

  @Post()
  @UseGuards(AuthGuard(), new RolesGuard(Role.Admin))
  public createPlate(
    @Body(ValidationPipe) createPlateDto: CreatePlateDto,
    @GetUser() user: User,
  ): Promise<Plate> {
    this.logger.verbose(
      `User "${user.firstName} ${
        user.lastName
      }" creating new plate. Data: ${JSON.stringify(createPlateDto)}.`,
    );
    return this.platesService.createPlate(createPlateDto, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard(), new RolesGuard(Role.Admin))
  public deletePlate(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(`User "${user.id}" deleting plate with ID "${id}".`);
    return this.platesService.deletePlate(id, user);
  }
}
