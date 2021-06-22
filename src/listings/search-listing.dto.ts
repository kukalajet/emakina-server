import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';

export class SearchListingDto {
  @IsArray()
  @IsOptional()
  @Type(() => Number)
  ids: number[];

  @IsNumber()
  @IsOptional()
  manufacturerId: number;

  @IsNumber()
  @IsOptional()
  modelId: number;

  @IsNumber()
  @IsOptional()
  fuelId: number;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @Type(() => Number)
  matriculation: number[];

  @IsNumber()
  @IsOptional()
  transmissionId: number;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @Type(() => Number)
  price: number[];

  @IsNumber()
  @IsOptional()
  valuteId: number;

  @IsNumber()
  @IsOptional()
  mileage: number;
}
