import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class TransmissionDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  type: string;
}

class VehicleTypeDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}

class FuelDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  type: string;
}

class PlateDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}

class ColorDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}

class LocationDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}

class ManufacturerDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}

class ModelDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}

class ValuteDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  symbol: string;
}

export class CreateListingDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(240)
  description: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => VehicleTypeDto)
  type: VehicleTypeDto;

  @IsDefined()
  @ValidateNested()
  @Type(() => TransmissionDto)
  transmission: TransmissionDto;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsNumber()
  @IsNotEmpty()
  mileage: number;

  @IsDefined()
  @ValidateNested()
  @Type(() => FuelDto)
  fuel: FuelDto;

  @IsDefined()
  @ValidateNested()
  @Type(() => PlateDto)
  plate: PlateDto;

  @IsDefined()
  @ValidateNested()
  @Type(() => ColorDto)
  color: ColorDto;

  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;

  @ValidateNested()
  @Type(() => ManufacturerDto)
  manufacturer: ManufacturerDto;

  @ValidateNested()
  @Type(() => ModelDto)
  model: ModelDto;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ValidateNested()
  @Type(() => ValuteDto)
  valute: ValuteDto;
}
