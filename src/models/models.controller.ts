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
import { CreateModelDto } from './create-model.dto';
import { Model } from './model.entity';
import { ModelsService } from './models.service';

@Controller('models')
export class ModelsController {
  private logger = new Logger('ModelsController');

  constructor(private modelsService: ModelsService) {}

  @Get()
  public getModels() {
    this.logger.verbose('Retrieving all models.');
    return this.modelsService.getModels();
  }

  @Post()
  @UseGuards(AuthGuard())
  public createModel(
    @Body(ValidationPipe) createModelDto: CreateModelDto,
    @GetUser() user: User,
  ): Promise<Model> {
    this.logger.verbose(
      `User "${user.firstName} ${
        user.lastName
      }" creating new model. Data: ${JSON.stringify(createModelDto)}.`,
    );
    return this.modelsService.createModel(createModelDto, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  public deleteModel(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(`User "${user.id}" deleting model with ID "${id}".`);
    return this.modelsService.deleteModel(id, user);
  }
}
