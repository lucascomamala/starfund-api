import { Request, Response } from "express";

import { Fight } from "../entities/Fight";
import { updateFighterRankings } from "../utils/update_fighter_rankings";

/**
 * @api {get} /fights Get a list of all Fights
 * @apiVersion 0.1.0
 * @apiName GetFights
 * @apiGroup Fight
 *
 * @apiSuccess {Fight[]} fights List of Fights
 */
export const getFights = async (req: Request, res: Response) => {
  try {
    const fights = await Fight.find();
    return res.json(fights);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

/**
 * @api {get} /fights/:id Get a fight by id
 * @apiVersion 0.1.0
 * @apiName GetFight
 * @apiGroup Fight
 *
 * @apiParam {Number} id <code>id</code> of the fight.
 *
 * @apiSuccess {Number} id Fight's id
 * @apiSuccess {Event} event Event associated with the fight
 * @apiSuccess {Fighter} winner Fighter who won the fight
 * @apiSuccess {Fighter} loser Fighter who lost the fight
 * @apiSuccess {Number} [last_round] Number of the last round
 * @apiSuccess {String} [referee] Referee of the fight
 * @apiSuccess {String} [win_condition] Win condition of the fight
 */
export const getFight = async (req: Request, res: Response) => {
  try {
    const fight = await Fight.findOne({
      where: {
        id: parseInt(req.params.id),
      },
      relations: ["event", "winner", "loser"],
    });
    if (!fight) return res.status(404).json({ message: "Fight not found" });
    return res.json(fight);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

/**
 * @api {post} /fights Create a new Fight
 * @apiVersion 0.1.0
 * @apiName CreateFight
 * @apiGroup Fight
 *
 * @apiBody {Number} event_id Event ID associated with the fight
 * @apiBody {Number} winner_id Winner fighter's ID
 * @apiBody {Number} loser_id Loser fighter's ID
 * @apiBody {Number} last_round Number of the last round
 * @apiBody {String} referee Referee of the fight
 * @apiBody {String} win_condition Win condition of the fight
 */
export const createFight = async (req: Request, res: Response) => {
  try {
    const {
      event_id,
      winner_id,
      loser_id,
      last_round,
      referee,
      win_condition,
    } = req.body;

    if (!event_id || !winner_id || !loser_id)
      return res.status(400).json({ message: "Missing required fields" });

    if (winner_id === loser_id)
      return res.status(400).json({ message: "Winner and loser can't be the same" });

    const fight = new Fight();
    fight.event = event_id;
    fight.winner = winner_id;
    fight.loser = loser_id;
    fight.last_round = last_round;
    fight.referee = referee;
    fight.win_condition = win_condition;

    // Calls our function to update the fighter rankings
    await updateFighterRankings(winner_id, loser_id);

    await fight.save();
    return res.status(201).json({ message: "Fight created" });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

/**
 * @api {put} /fights/:id Update a Fight with the given id
 * @apiVersion 0.1.0
 * @apiName UpdateFight
 * @apiGroup Fight
 *
 * @apiParam {Number} id <code>id</code> of the fight.
 *
 * @apiBody {Number} event_id Event ID associated with the fight
 * @apiBody {Number} winner_id Winner fighter's ID
 * @apiBody {Number} loser_id Loser fighter's ID
 * @apiBody {Number} [last_round] Number of the last round
 * @apiBody {String} [referee] Referee of the fight
 * @apiBody {String} [win_condition] Win condition of the fight
 */
export const updateFight = async (req: Request, res: Response) => {
  try {
    const fight = await Fight.findOne({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (!fight) return res.status(404).json({ message: "Fight not found" });

    const {
      event_id,
      winner_id,
      loser_id,
      last_round,
      referee,
      win_condition,
    } = req.body;

    fight.event = event_id;
    fight.winner = winner_id;
    fight.loser = loser_id;
    fight.last_round = last_round;
    fight.referee = referee;
    fight.win_condition = win_condition;

    await fight.save();
    return res.status(200).json({ message: "Fight updated" });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

/**
 * @api {delete} /fights/:id Delete a Fight with the given id
 * @apiVersion 0.1.0
 * @apiName DeleteFight
 * @apiGroup Fight
 *
 * @apiParam {Number} id <code>id</code> of the fight.
 */
export const deleteFight = async (req: Request, res: Response) => {
  try {
    const fight = await Fight.findOne({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (!fight) return res.status(404).json({ message: "Fight not found" });

    await Fight.remove(fight);
    return res.status(200).json({ message: "Fight deleted" });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};
