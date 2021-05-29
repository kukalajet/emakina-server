import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTransmissionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  type: string;
}
