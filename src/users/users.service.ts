import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async getUserById(id: number, user: User): Promise<User> {
    const found = await this.userRepository.findOne({
      where: { id },
    });

    if (!found) {
      throw new NotFoundException(`User with id "${id}" not found`);
    }

    return found;
  }
}
