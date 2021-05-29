import { IsString } from 'class-validator';

export class GoogleAuthCredentialsDto {
  @IsString()
  idToken: string;

  @IsString()
  googleId: string;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  photoUrl: string;
}
