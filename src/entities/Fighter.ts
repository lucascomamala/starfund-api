import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm";

@Entity('fighters')
export class Fighter extends BaseEntity {
  @PrimaryGeneratedColumn()
  fighter_id: number;

  @Column()
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
  last_weight_grams: number;

  @Column({
    nullable: true,
  })
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
