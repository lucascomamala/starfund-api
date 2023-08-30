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
  Max,
  IsOptional,
  Length,
  IsDateString,
  IsUrl,
} from "class-validator";

import { Fighter } from "./Fighter"
import { Event } from "./Event"

@Entity()
export class Fight extends BaseEntity {
  @PrimaryGeneratedColumn()
  fight_id: number;

  @ManyToOne(() => Event, (event: Event) => event.fights)
  @IsNotEmpty()
  event: Event;

  @ManyToOne(() => Fighter, (fighter: Fighter) => fighter.fightsAsWinner)
  @IsNotEmpty()
  winner: Fighter;

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
