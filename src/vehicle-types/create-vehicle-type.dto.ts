import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateVehicleTypeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;
}
