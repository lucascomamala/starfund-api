import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import {
  IsNotEmpty,
  IsDateString,
  IsInt,
  IsOptional,
  IsUrl,
  Min,
  Length,
  IsEnum,
} from "class-validator";

import { Fight } from "./Fight";
import { Ranking } from "./Ranking";
import { Event } from "./Event";

import WeightClass from "../utils/weight_class";

@Entity()
export class Fighter extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @Length(2, 50)
  name: string;

  @Column({ default: 0 })
  @IsInt()
  @Min(0)
  wins: number;

  @Column({ default: 0 })
  @IsInt()
  @Min(0)
  losses: number;

  @Column({ default: 0 })
  @IsInt()
  @Min(0)
  knockouts: number;

  @Column({ default: 0 })
  @IsInt()
  @Min(0)
  submissions: number;

  @Column({ nullable: true })
  @IsEnum(WeightClass)
  @IsNotEmpty()
  weight_class: string;

  @Column({ nullable: true })
  @IsOptional()
  nationality: string;

  @Column({ nullable: true })
  @IsOptional()
  team: string;

  @Column({ nullable: true })
  @IsOptional()
  nickname: string;

  @Column({ nullable: true, type: "date" })
  @IsOptional()
  @IsDateString()
  date_of_birth: Date;

  @Column({ nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  last_weight_grams: number;

  @Column({ nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  height_cm: number;

  @Column({ nullable: true })
  @IsOptional()
  @IsUrl()
  image_path: string;

  // Define the relationship with the Fight entity (winners)
  @OneToMany(() => Fight, (fight: Fight) => fight.winner)
  fightsAsWinner: Fight[];

  // Define the relationship with the Fight entity (losers)
  @OneToMany(() => Fight, (fight: Fight) => fight.loser)
  fightsAsLoser: Fight[];

  // Define the relationship with the Ranking entity
  @OneToMany(() => Ranking, (ranking) => ranking.fighter)
  rankings: Ranking[];

  // Define the relationship with the Event entity
  @ManyToMany(() => Event, (event) => event.fighters, {
    cascade: true,
  })
  @JoinTable()
  events: Event[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
