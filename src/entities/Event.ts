import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from "typeorm";
import { IsNotEmpty, IsDateString, IsOptional, Length } from "class-validator";

import { Fight } from "./Fight";
import { Fighter } from "./Fighter";

@Entity()
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @Length(2, 100)
  name: string;

  @Column()
  @IsNotEmpty()
  location: string;

  @Column()
  @IsNotEmpty()
  venue: string;

  @Column({ type: "date" })
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  // Define the relationship with the Fight entity
  @OneToMany(() => Fight, (fight: Fight) => fight.event)
  fights: Fight[];

  // Define the relationship with the Fighter entity
  @ManyToMany(() => Fighter, (fighter) => fighter.events)
  fighters: Fighter[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
