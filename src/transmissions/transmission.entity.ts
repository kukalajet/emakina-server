import { Listing } from '../listings';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Transmission extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @OneToMany(
    type => Listing,
    listing => listing.fuel,
    { eager: true },
  )
  listings: Listing[];
}
