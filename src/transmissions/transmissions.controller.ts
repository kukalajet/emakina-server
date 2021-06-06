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
import { GetUser } from '../users/get-user.decorator';
import { User } from '../users/user.entity';
import { Transmission } from './transmission.entity';
import { TransmissionsService } from './transmissions.service';
import { CreateTransmissionDto } from './create-transmission.dto';

@Controller('transmissions')
export class TransmissionsController {
  private logger = new Logger('TransmissionsController');

  constructor(private transmissionsService: TransmissionsService) {}

  @Get()
  public getTransmissions(): Promise<Transmission[]> {
    this.logger.verbose('Retrieve all transmissions');
    return this.transmissionsService.getTransmissions();
  }

  @Post()
  @UseGuards(AuthGuard())
  public createTransmission(
    @Body(ValidationPipe) createTransmissionDto: CreateTransmissionDto,
    @GetUser() user: User,
  ): Promise<Transmission> {
    this.logger.verbose(
      `User "${user.id}" creating new transmission. Data: ${JSON.stringify(
        createTransmissionDto,
      )}`,
    );
    return this.transmissionsService.createTransmission(
      createTransmissionDto,
      user,
    );
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  public deleteTransmission(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(
      `User "${user.id}" deleting transmission with ID "${id}".`,
    );
    return this.transmissionsService.deleteTransmission(id, user);
  }
}
