import { Entity, ManyToOne, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { Fighter } from "./Fighter";
import { Event } from "./Event";

@Entity()
export class EventFighter extends BaseEntity {
  @PrimaryGeneratedColumn()
  event_fighter_id: number;

  @ManyToOne(() => Event, (event) => event.eventFighters)
  event: Event;

  @ManyToOne(() => Fighter, (fighter) => fighter.eventFighters)
  fighter: Fighter;
}
