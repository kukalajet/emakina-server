import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;
}
