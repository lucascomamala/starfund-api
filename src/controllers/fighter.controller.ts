import { Request, Response } from "express";
import { ConnectionClosedEvent } from "typeorm";

import { Fighter } from "../entities/Fighter";


// TODO: Implement pagination
/**
 * @api {get} /fighters Get a list of all the Fighters
 * @apiVersion 0.1.0
 * @apiName GetFighters
 * @apiGroup Fighter
 *
 * @apiSuccess {String} name Fighter's full name
 * @apiSuccess {Number} wins=0 Number of wins
 * @apiSuccess {Number} losses=0 Number of losses
 * @apiSuccess {Number} knockouts=0 Number of knockouts
 * @apiSuccess {Number} submissions=0 Number of submissions
 * @apiSuccess {String} weight_class Fighter's weight class
 * @apiSuccess {String} nationality Fighter's nationality
 * @apiSuccess {String} team Fighter's team
 * @apiSuccess {String} nickname Fighter's nickname
 * @apiSuccess {Date} date_of_birth Fighter's date of birth
 * @apiSuccess {Number} height_cm Fighter's height in centimeters
 * @apiSuccess {Number} last_weight_grams Fighter's last weight in grams
 * @apiSuccess {String} image_path Path to the Fighter's image
 *
 */
export const getFighters = async (req: Request, res: Response) => {
  try {
    return res.json(await Fighter.find())
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

/**
 * @api {post} /fighters Create a new Fighter
 * @apiVersion 0.1.0
 * @apiName CreateFighter
 * @apiGroup Fighter
 * @apiPermission none
 *
 * @apiBody {String} name Fighter's full name
 * @apiBody {Number} wins=0 Number of wins
 * @apiBody {Number} losses=0 Number of losses
 * @apiBody {Number} knockouts=0 Number of knockouts
 * @apiBody {Number} submissions=0 Number of submissions
 * @apiBody {String} weight_class Fighter's weight class
 * @apiBody {String} nationality Fighter's nationality
 * @apiBody {String} team Fighter's team
 * @apiBody {String} nickname Fighter's nickname
 * @apiBody {Date} date_of_birth Fighter's date of birth
 * @apiBody {Number} height_cm Fighter's height in centimeters
 * @apiBody {Number} last_weight_grams Fighter's last weight in grams
 * @apiBody {String} image_path Path to the Fighter's image
 *
 * @apiSuccess {Number} id         The new Users-ID.
 *
 */
export const createFighter = async (req: Request, res: Response) => {
  const {
    name,
    wins,
    losses,
    knockouts,
    submissions,
    weight_class,
    nationality,
    team,
    nickname,
    date_of_birth,
    height_cm,
    last_weight_grams,
    image_path,
  } = req.body;

  const f = new Fighter();
  f.name = name;
  f.wins = wins;
  f.losses = losses;
  f.knockouts = knockouts;
  f.submissions = submissions;
  f.weight_class = weight_class;
  f.nationality = nationality;
  f.team = team;
  f.nickname = nickname;
  f.date_of_birth = date_of_birth;
  f.height_cm = height_cm;
  f.last_weight_grams = last_weight_grams;
  f.image_path = image_path;

  try {
    await f.save();
    return res.json(f);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};
