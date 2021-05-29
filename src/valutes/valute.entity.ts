import { Listing } from '../listings';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Valute extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  symbol: string;

  @OneToMany(
    type => Listing,
    listing => listing.plate,
    { eager: true },
  )
  listings: Listing[];
}
