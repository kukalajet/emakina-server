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
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../auth/role.enum';
import { RolesGuard } from '../auth/roles.guard';
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
  @UseGuards(AuthGuard(), new RolesGuard(Role.Admin))
  public createVehicleType(
    @Body(ValidationPipe) createVehicleTypeDto: CreateVehicleTypeDto,
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
  @UseGuards(AuthGuard(), new RolesGuard(Role.Admin))
  public deleteVehicleType(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(`User "${user.id}" deleting type with ID "${id}".`);
    return this.vehicleTypesService.deleteVehicleType(id, user);
  }
}
