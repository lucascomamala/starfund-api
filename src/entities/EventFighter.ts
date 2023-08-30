import { Entity, ManyToOne, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { Fighter } from "./Fighter";
import { Event } from "./Event";

// Join table between Event and Fighter
@Entity()
export class EventFighter extends BaseEntity {
  @PrimaryGeneratedColumn()
  event_fighter_id: number;

  // Define the relationship with the Event entity
  @ManyToOne(() => Event, (event) => event.eventFighters)
  event: Event;

  // Define the relationship with the Fighter entity
  @ManyToOne(() => Fighter, (fighter) => fighter.eventFighters)
  fighter: Fighter;
}
