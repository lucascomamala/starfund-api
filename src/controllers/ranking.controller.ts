import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { Ranking } from "../entities/Ranking";

/**
 * @api {get} /rankings Get a list of all the Rankings
 * @apiVersion 0.1.0
 * @apiName GetRankings
 * @apiGroup Ranking
 *
 * @apiSuccess {Ranking[]} rankings List of Rankings
 */
export const getRankings = async (req: Request, res: Response) => {
  try {
    const rankings = await Ranking.find();
    return res.json(rankings);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

/**
 * @api {get} /rankings/:id Get a ranking by id
 * @apiVersion 0.1.0
 * @apiName GetRanking
 * @apiGroup Ranking
 *
 * @apiParam {Number} id <code>id</code> of the ranking.
 *
 * @apiSuccess {Number} id Ranking's id
 * @apiSuccess {String} category Ranking's weight class category
 * @apiSuccess {Fighter} fighter Fighter associated with the ranking
 * @apiSuccess {Number} rank Fighter's ranking in the category
 */
export const getRanking = async (req: Request, res: Response) => {
  try {
    const ranking = await Ranking.findOne({
      where: {
        id: parseInt(req.params.id),
      },
      relations: ["fighter"],
    });

    if (!ranking) return res.status(404).json({ message: "Ranking not found" });
    return res.json(ranking);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

/**
 * @api {post} /rankings Create a new Ranking
 * @apiVersion 0.1.0
 * @apiName CreateRanking
 * @apiGroup Ranking
 * @apiPermission none
 *
 * @apiBody {String} category Ranking's weight class category
 * @apiBody {Number} rank Fighter's ranking in the category
 * @apiBody {Number} fighter_id Fighter's id associated with the ranking
 */
export const createRanking = async (req: Request, res: Response) => {
  try {
    const { category, rank, fighter_id } = req.body;

    const ranking = new Ranking();
    ranking.category = category;
    ranking.rank = rank;
    if (fighter_id) ranking.fighter = fighter_id;

    await ranking.save();
    return res.status(201).json({ message: "Ranking created" });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

/**
 * @api {put} /rankings/:id Updates a Ranking with the given id
 * @apiVersion 0.1.0
 * @apiName UpdateRanking
 * @apiGroup Ranking
 * @apiPermission none
 *
 * @apiParam {Number} id <code>id</code> of the ranking.
 *
 * @apiBody {String} category Ranking's weight class category
 * @apiBody {Number} rank Fighter's ranking in the category
 */
export const updateRanking = async (req: Request, res: Response) => {
  try {
    const ranking = await Ranking.findOne({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (!ranking) return res.status(404).json({ message: "Ranking not found" });

    ranking.category = req.body.category;
    ranking.rank = req.body.rank;

    await ranking.save();
    return res.status(200).json({ message: "Ranking updated" });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

/**
 * @api {delete} /rankings/:id Deletes a Ranking with the given id
 * @apiVersion 0.1.0
 * @apiName DeleteRanking
 * @apiGroup Ranking
 * @apiPermission none
 *
 * @apiParam {Number} id <code>id</code> of the ranking.
 *
 * @apiError RankingNotFound The <code>id</code> of the Ranking was not found.
 */
export const deleteRanking = async (req: Request, res: Response) => {
  try {
    const ranking = await Ranking.findOne({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (!ranking) return res.status(404).json({ message: "Ranking not found" });

    await Ranking.remove(ranking);
    return res.status(200).json({ message: "Ranking deleted" });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};
