import { Request, Response } from "express";
import { Event } from "../entities/Event";
import { Fighter } from "../entities/Fighter";
import { Fight } from "../entities/Fight";

/**
 * @api {post} /event Create a new Event
 * @apiVersion 0.1.0
 * @apiName CreateEvent
 * @apiGroup Event
 *
 * @apiBody {String} name Event's name
 * @apiBody {String} location Event's location
 * @apiBody {String} venue Event's venue
 * @apiBody {Date} date Event's date
 * @apiBody {Number[]} [fighter_ids] IDs of fighters participating in the event
 * @apiBody {Number[]} [fight_ids] IDs of fights associated with the event
 */
export const createEvent = async (req: Request, res: Response) => {
  try {
    const { name, location, venue, date, fighter_ids, fight_ids } = req.body;

    const event = new Event();
    event.name = name;
    event.location = location;
    event.venue = venue;
    event.date = date;

    await event.save();

    if (fighter_ids) {
      const fighters = await Fighter.findByIds(fighter_ids);
      event.fighters = fighters;
    }

    if (fight_ids) {
      const fights = await Fight.findByIds(fight_ids);
      event.fights = fights;
    }

    await event.save();

    return res.status(201).json({ message: "Event created" });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

/**
 * @api {get} /event Get a list of all Events
 * @apiVersion 0.1.0
 * @apiName GetEvents
 * @apiGroup Event
 *
 * @apiSuccess {Event[]} events List of Events
 */
export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find();
    return res.json(events);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

/**
 * @api {get} /event/:id Get an event by id
 * @apiVersion 0.1.0
 * @apiName GetEvent
 * @apiGroup Event
 *
 * @apiParam {Number} id <code>id</code> of the event.
 *
 * @apiSuccess {Number} id Event's id
 * @apiSuccess {String} name Event's name
 * @apiSuccess {String} location Event's location
 * @apiSuccess {String} venue Event's venue
 * @apiSuccess {Date} date Event's date
 * @apiSuccess {Fight[]} fights List of fights associated with the event
 * @apiSuccess {Fighter[]} fighters List of fighters participating in the event
 * 
 * @apiError EventNotFound   The <code>id</code> of the Event was not found.
 * 
 */
export const getEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findOne({
      where: {
          id: parseInt(req.params.id)
      },
      relations: {
          fights: true,
          fighters: true,
      },
    })
    if (!event) return res.status(404).json({ message: "Event not found" });
    return res.json(event);

  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

/**
 * @api {put} /event/:id Update an Event with the given id
 * @apiVersion 0.1.0
 * @apiName UpdateEvent
 * @apiGroup Event
 *
 * @apiParam {Number} id <code>id</code> of the event.
 *
 * @apiBody {String} name Event's name
 * @apiBody {String} location Event's location
 * @apiBody {String} venue Event's venue
 * @apiBody {Date} date Event's date
 * @apiBody {Number[]} [fighter_ids] IDs of fighters participating in the event
 * @apiBody {Number[]} [fight_ids] IDs of fights associated with the event
 * 
 * @apiError EventNotFound   The <code>id</code> of the Event was not found.
 * 
 */
export const updateEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findOne({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (!event) return res.status(404).json({ message: "Event not found" });

    const { name, location, venue, date, fighter_ids, fight_ids } = req.body;

    event.name = name;
    event.location = location;
    event.venue = venue;
    event.date = date;

    await event.save();

    if (fighter_ids) {
      const fighters = await Fighter.findByIds(fighter_ids);
      event.fighters = fighters;
    }

    if (fight_ids) {
      const fights = await Fight.findByIds(fight_ids);
      event.fights = fights;
    }

    await event.save();

    return res.status(200).json({ message: "Event updated" });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

/**
 * @api {delete} /event/:id Delete an Event with the given id
 * @apiVersion 0.1.0
 * @apiName DeleteEvent
 * @apiGroup Event
 *
 * @apiParam {Number} id <code>id</code> of the event.
 * 
 * @apiError EventNotFound   The <code>id</code> of the Event was not found.
 * 
 */
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findOne({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (!event) return res.status(404).json({ message: "Event not found" });

    await Event.remove(event);
    return res.status(200).json({ message: "Event deleted" });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};
