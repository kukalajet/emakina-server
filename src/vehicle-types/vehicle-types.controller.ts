import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../users/get-user.decorator';
import { User } from '../users/user.entity';
import { CreateVehicleTypeDto } from './create-vehicle-type.dto';
import { VehicleType } from './vehicle-type.entity';
import { VehicleTypesService } from './vehicle-types.service';

@Controller('types')
export class VehicleTypesController {
  private logger = new Logger('VehicleTypesController');

  constructor(private vehicleTypesService: VehicleTypesService) {}

  @Get()
  public getVehicleTypes() {
    this.logger.verbose('Retrieving all types.');
    return this.vehicleTypesService.getVehicleTypes();
  }

  @Post()
  @UseGuards(AuthGuard())
  public createVehicleType(
    @Body() createVehicleTypeDto: CreateVehicleTypeDto,
    @GetUser() user: User,
  ): Promise<VehicleType> {
    this.logger.verbose(
      `User "${user.firstName} ${
        user.lastName
      }" creating new type. Data: ${JSON.stringify(createVehicleTypeDto)}.`,
    );
    return this.vehicleTypesService.createVehicleType(
      createVehicleTypeDto,
      user,
    );
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  public deleteVehicleType(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(`User "${user.id}" deleting type with ID "${id}".`);
    return this.vehicleTypesService.deleteVehicleType(id, user);
  }
}
