import { Listing } from '../listings';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class VehicleType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    type => Listing,
    listing => listing.type,
    { eager: true },
  )
  listings: Listing[];
}
