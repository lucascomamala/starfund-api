import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
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
  @IsOptional()
  @IsEnum(WeightClass)
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

  @OneToMany(() => Fight, (fight: Fight) => fight.winner)
  fightsAsWinner: Fight[];

  @OneToMany(() => Fight, (fight: Fight) => fight.loser)
  fightsAsLoser: Fight[];

  @OneToMany(() => Ranking, (ranking) => ranking.fighter)
  rankings: Ranking[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
