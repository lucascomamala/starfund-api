import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsNotEmpty, IsInt, IsEnum } from "class-validator";
import { Fighter } from "./Fighter"; // Import the Fighter entity if you have it defined

import WeightClass from "../utils/weight_class";

@Entity()
export class Ranking extends BaseEntity {
  @PrimaryGeneratedColumn()
  ranking_id: number;

  @Column()
  @IsNotEmpty()
  @IsEnum(WeightClass)
  category: WeightClass;

  @ManyToOne(() => Fighter)
  @IsNotEmpty()
  fighter: Fighter;

  @Column()
  @IsInt()
  rank: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
