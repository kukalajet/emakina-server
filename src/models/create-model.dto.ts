import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

class ManufacturerDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export class CreateModelDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => ManufacturerDto)
  manufacturer: ManufacturerDto;
}
