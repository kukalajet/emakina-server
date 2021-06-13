import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Listing } from '../listings';
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  googleId: string;

  @Column()
  facebookId: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(
    type => Listing,
    listing => listing.user,
    { eager: true },
  )
  listings: Listing[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
