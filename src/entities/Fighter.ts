import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";

import { IsInt, Length, Max, Min } from "class-validator";

@Entity()
export class Fighter extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(2, 40)
  name: string;

  @Column({
    default: 0,
  })
  wins: number;

  @Column({
    default: 0,
  })
  losses: number;

  @Column({
    default: 0,
  })
  knockouts: number;

  @Column({
    default: 0,
  })
  submissions: number;

  @Column({
    nullable: true,
  })
  weight_class: string;

  @Column({
    nullable: true,
  })
  nationality: string;

  @Column({
    nullable: true,
  })
  team: string;

  @Column({
    nullable: true,
  })
  nickname: string;

  @Column({
    nullable: true,
    type: "date",
  })
  date_of_birth: Date;

  @Column({
    nullable: true,
  })
  @IsInt()
  @Min(40000)
  @Max(200000)
  last_weight_grams: number;

  @Column({
    nullable: true,
  })
  @IsInt()
  @Min(0)
  @Max(350)
  height_cm: number;

  @Column({
    nullable: true,
  })
  image_path: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
