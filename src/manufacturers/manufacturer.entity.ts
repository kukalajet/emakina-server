import { Listing } from '../listings';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Model } from '../models';

@Entity()
export class Manufacturer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    type => Listing,
    listing => listing.manufacturer,
    { eager: true },
  )
  listings: Listing[];

  @OneToMany(
    type => Model,
    model => model.manufacturer,
  )
  models: Model[];
}
