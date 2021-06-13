import { IsString } from 'class-validator';

export class FacebookAuthCredentialsDto {
  @IsString()
  inputToken: string;

  @IsString()
  accessToken: string;

  @IsString()
  facebookId: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  photoUrl: string;
}
