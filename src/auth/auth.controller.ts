import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthCredentialsDto,
  RegisterCredentialsDto,
  GoogleAuthCredentialsDto,
} from './dto';
import { FacebookAuthCredentialsDto } from './dto/facebook-auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) registerCredentialsDto: RegisterCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(registerCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('/signinwithgoogle')
  signInWithGoogle(
    @Body(ValidationPipe) googleAuthCredentialsDto: GoogleAuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signInWithGoogle(googleAuthCredentialsDto);
  }

  @Post('/signinwithfacebook')
  signInWithFacebook(
    @Body(ValidationPipe)
    facebookAuthCredentialsDto: FacebookAuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signInWithFacebook(facebookAuthCredentialsDto);
  }
}
