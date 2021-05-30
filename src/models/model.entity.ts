import { Listing } from '../listings';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Manufacturer } from '../manufacturers';

@Entity()
export class Model extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    type => Listing,
    listing => listing.model,
    { eager: true },
  )
  listings: Listing[];

  @ManyToOne(
    type => Manufacturer,
    manufacturer => manufacturer.models,
    { eager: true },
  )
  manufacturer: Manufacturer;
}
