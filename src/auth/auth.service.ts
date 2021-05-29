import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../users/users.repository';
import {
  AuthCredentialsDto,
  GoogleAuthCredentialsDto,
  RegisterCredentialsDto,
} from './dto';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(registerCredentialsDto: RegisterCredentialsDto): Promise<void> {
    return this.userRepository.signUp(registerCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const id = await this.userRepository.validatePassword(authCredentialsDto);
    if (!id) throw new UnauthorizedException('Invalid credentials');

    const payload: JwtPayload = {
      id,
    };
    const accessToken = await this.jwtService.sign(payload);
    this.logger.debug(
      `Generated JWT token with payload ${JSON.stringify(payload)}`,
    );

    return { accessToken };
  }

  async signInWithGoogle(
    googleAuthCredentialsDto: GoogleAuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const id = await this.userRepository.validateGoogleIdToken(
      googleAuthCredentialsDto,
    );
    const payload: JwtPayload = { id };
    const accessToken = await this.jwtService.sign(payload);
    this.logger.debug(
      `Generated JWT token for payload ${JSON.stringify(payload)}`,
    );

    return { accessToken };
  }
}
