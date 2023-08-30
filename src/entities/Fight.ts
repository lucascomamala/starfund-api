import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import {
  IsNotEmpty,
  IsInt,
  Min,
  IsOptional,
  Length,
} from "class-validator";

import { Fighter } from "./Fighter"
import { Event } from "./Event"

@Entity()
export class Fight extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // Define the relationship with the Event entity
  @ManyToOne(() => Event, (event: Event) => event.fights)
  @IsNotEmpty()
  event: Event;

  // Define the relationship with the Fighter entity (winners)
  @ManyToOne(() => Fighter, (fighter: Fighter) => fighter.fightsAsWinner)
  @IsNotEmpty()
  winner: Fighter;

  // Define the relationship with the Fighter entity (losers)
  @ManyToOne(() => Fighter, (fighter: Fighter) => fighter.fightsAsLoser)
  @IsNotEmpty()
  loser: Fighter;

  @Column()
  @IsInt()
  @Min(1)
  last_round: number;

  @Column({ nullable: true })
  @IsOptional()
  @Length(2, 50)
  referee: string;

  @Column()
  win_condition: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
