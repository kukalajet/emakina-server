import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Listing } from '../listings';
import { Locations } from './locations.enum';

@Entity()
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    type => Listing,
    listing => listing.location,
    { eager: true },
  )
  listings: Listing[];
}
