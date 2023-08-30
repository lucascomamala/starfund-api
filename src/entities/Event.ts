import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsNotEmpty, IsDateString, IsOptional, Length } from "class-validator";

import { Fight } from "./Fight";
import { EventFighter } from "./EventFighter";

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

  @Column({ nullable: true })
  @IsOptional()
  venue: string;

  @Column({ type: "date" })
  @IsDateString()
  date: Date;

  // Define the relationship with the Fight entity
  @OneToMany(() => Fight, (fight: Fight) => fight.event)
  fights: Fight[];

  // Define the relationship with the EventFighter entity (join table)
  @OneToMany(() => EventFighter, (eventFighter) => eventFighter.event)
  eventFighters: EventFighter[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
