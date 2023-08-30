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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
