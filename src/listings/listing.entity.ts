import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { ListingStatus } from './listing-status.enum';
import { User } from '../users';
import { Location } from '../locations';
import { Color } from '../colors';
import { Fuel } from '../fuels';
import { Transmission } from '../transmissions';
import { Plate } from '../plates';
import { VehicleType } from '../vehicle-types';
import { Valute } from '../valutes';
import { Manufacturer } from '../manufacturers';
import { Model } from '../models';

@Entity()
export class Listing extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(
    type => VehicleType,
    type => type.listings,
    { eager: false },
  )
  type: VehicleType;

  @ManyToOne(
    type => Transmission,
    transmission => transmission.listings,
    { eager: false },
  )
  transmission: Transmission;

  @Column()
  year: number;

  @Column()
  mileage: number;

  @ManyToOne(
    type => Fuel,
    fuel => fuel.listings,
    { eager: false },
  )
  fuel: Fuel;

  // TODO: add images.

  @ManyToOne(
    type => Plate,
    plate => plate.listings,
    { eager: false },
  )
  plate: Plate;

  @ManyToOne(
    type => Color,
    color => color.listings,
    { eager: false },
  )
  color: Color;

  @ManyToOne(
    type => Location,
    location => location.listings,
    { eager: false },
  )
  location: Location;

  @ManyToOne(
    type => Manufacturer,
    manufacturer => manufacturer.listings,
    { eager: false },
  )
  manufacturer: Manufacturer;

  @ManyToOne(
    type => Model,
    model => model.listings,
    { eager: false },
  )
  model: Model;

  @Column()
  price: number;

  @ManyToOne(
    type => Valute,
    model => model.listings,
    { eager: false },
  )
  valute: Valute;

  @Column()
  quantity: number;

  @Column()
  status: ListingStatus;

  @ManyToOne(
    type => User,
    user => user.listings,
    { eager: false },
  )
  user: User;
}
