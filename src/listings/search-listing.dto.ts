import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNumber,
  ValidateNested,
} from 'class-validator';

export class SearchListingDto {
  @IsNumber()
  manufacturerId: number;

  @IsNumber()
  modelId: number;

  @IsNumber()
  fuelId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @Type(() => Number)
  matriculation: number[];

  @IsNumber()
  transmissionId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @Type(() => Number)
  price: number[];

  @IsNumber()
  valuteId: number;

  @IsNumber()
  mileage: number;
}
