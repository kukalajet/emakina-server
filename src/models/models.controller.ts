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
import { CreateModelDto } from './create-model.dto';
import { Model } from './model.entity';
import { ModelsService } from './models.service';
import { PaginationDto } from './pagination.dto';

@Controller('models')
export class ModelsController {
  private logger = new Logger('ModelsController');

  constructor(private modelsService: ModelsService) {}

  @Get()
  public getModels(@Query(ValidationPipe) paginationDto: PaginationDto) {
    this.logger.verbose('Retrieving all models.');
    return this.modelsService.getModels({
      ...paginationDto,
      limit: paginationDto.limit > 20 ? 20 : paginationDto.limit,
    });
  }

  @Post()
  @UseGuards(AuthGuard(), new RolesGuard(Role.Admin))
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
  @UseGuards(AuthGuard(), new RolesGuard(Role.Admin))
  public deleteModel(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(`User "${user.id}" deleting model with ID "${id}".`);
    return this.modelsService.deleteModel(id, user);
  }
}
