import { EntityRepository, Repository } from 'typeorm';
import {
  GoogleAuthCredentialsDto,
  AuthCredentialsDto,
  RegisterCredentialsDto,
} from '../auth/dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as config from 'config';
import { OAuth2Client } from 'google-auth-library';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(registerCredentialsDto: RegisterCredentialsDto): Promise<void> {
    const { firstName, lastName, email, password } = registerCredentialsDto;

    const user = new User();
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      // duplicated unique field
      if (error.code === '23505') {
        throw new ConflictException('User already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validatePassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<number> {
    const { email, password } = authCredentialsDto;
    const user = await this.findOne({ email });

    if (user && (await user.validatePassword(password))) {
      return user.id;
    }

    return null;
  }

  async validateGoogleIdToken(
    googleAuthCredentialsDto: GoogleAuthCredentialsDto,
  ): Promise<number> {
    const {
      idToken,
      googleId,
      name,
      email,
      photoUrl,
    } = googleAuthCredentialsDto;

    const verifiedId = await this.validateIdToken(idToken);
    if (!verifiedId && verifiedId !== googleId) {
      throw new UnauthorizedException('Could not verify Google token');
    }

    let user = await this.findOne({ email });
    if (user) {
      return user.id;
    }

    const newUser = new User();
    newUser.email = email;
    newUser.firstName = name;
    // newUser.googleId = googleId;
    // newUser.photoUrl = photoUrl;

    try {
      await newUser.save();
    } catch (error) {
      // duplicated unique field
      if (error.code === '23505') {
        throw new ConflictException('User already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    user = await this.findOne({ email });
    return user.id;
  }

  async validateIdToken(idToken: string): Promise<string> {
    const googleClientId = config.get('auth').google_client_id;
    const client = new OAuth2Client(googleClientId);
    const ticket = await client.verifyIdToken({
      idToken,
    });
    const payload = ticket.getPayload();
    const userId = payload.sub;

    return userId;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
