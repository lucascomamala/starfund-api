import { Request, Response } from "express";

import { Fighter } from "../entities/Fighter";

/**
 * @api {get} /fighters Get a list of all the Fighters
 * @apiVersion 0.1.0
 * @apiName GetFighters
 * @apiGroup Fighter
 *
 * @apiSuccess {Fighter[]} fighters List of Fighters
 *
 */
export const getFighters = async (req: Request, res: Response) => {
  try {
    return res.json(await Fighter.find({ relations: ["rankings", "fightsAsWinner", "fightsAsLoser"]}));
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

/**
 * @api {get} /fighters/:id Get a fighter by id
 * @apiVersion 0.1.0
 * @apiName GetFighter
 * @apiGroup Fighter
 *
 * @apiParam {Number} id <code>id</code> of the fighter.
 *
 * @apiSuccess {String} name Fighter's full name
 * @apiSuccess {Number} wins Number of wins
 * @apiSuccess {Number} losses Number of losses
 * @apiSuccess {Number} knockouts Number of knockouts
 * @apiSuccess {Number} submissions Number of submissions
 * @apiSuccess {String} weight_class Fighter's weight class
 * @apiSuccess {String} nationality Fighter's nationality
 * @apiSuccess {String} team Fighter's team
 * @apiSuccess {String} nickname Fighter's nickname
 * @apiSuccess {Date} date_of_birth Fighter's date of birth
 * @apiSuccess {Number} height_cm Fighter's height in centimeters
 * @apiSuccess {Number} last_weight_grams Fighter's last weight in grams
 * @apiSuccess {String} image_path Path to the Fighter's image
 *
 * @apiError FighterNotFound   The <code>id</code> of the Fighter was not found.
 *
 */
export const getFighter = async (req: Request, res: Response) => {
  try {
    return res.json(
      await Fighter.findOne({
        where: {
          id: parseInt(req.params.id),
        },
        relations: ["rankings", "fightsAsWinner", "fightsAsLoser"],
      })
    );
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
 * @apiBody {String} weight_class Fighter's weight class
 * @apiBody {Number} [wins=0] Number of wins
 * @apiBody {Number} [losses=0] Number of losses
 * @apiBody {Number} [knockouts=0] Number of knockouts
 * @apiBody {Number} [submissions=0] Number of submissions
 * @apiBody {String} [nationality] Fighter's nationality
 * @apiBody {String} [team] Fighter's team
 * @apiBody {String} [nickname] Fighter's nickname
 * @apiBody {Date} [date_of_birth] Fighter's date of birth
 * @apiBody {Number} [height_cm] Fighter's height in centimeters
 * @apiBody {Number} [last_weight_grams] Fighter's last weight in grams
 * @apiBody {String} [image_path] Path to the Fighter's image
 *
 */
export const createFighter = async (req: Request, res: Response) => {
  try {
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

    await f.save();
    return res.status(201).json({ message: "Fighter created" });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

/**
 * @api {put} /fighters/:id Updates a Fighter with the given id
 * @apiVersion 0.1.0
 * @apiName UpdateFighter
 * @apiGroup Fighter
 * @apiPermission none
 *
 * @apiParam {Number} id <code>id</code> of the fighter.
 *
 * @apiBody {String} name Fighter's full name
 * @apiBody {String} weight_class Fighter's weight class
 * @apiBody {Number} [wins] Number of wins
 * @apiBody {Number} [losses] Number of losses
 * @apiBody {Number} [knockouts] Number of knockouts
 * @apiBody {Number} [submissions] Number of submissions
 * @apiBody {String} [nationality] Fighter's nationality
 * @apiBody {String} [team] Fighter's team
 * @apiBody {String} [nickname] Fighter's nickname
 * @apiBody {Date} [date_of_birth] Fighter's date of birth
 * @apiBody {Number} [height_cm] Fighter's height in centimeters
 * @apiBody {Number} [last_weight_grams] Fighter's last weight in grams
 * @apiBody {String} [image_path] Path to the Fighter's image
 *
 * @apiError FighterNotFound   The <code>id</code> of the Fighter was not found.
 *
 */
export const updateFighter = async (req: Request, res: Response) => {
  try {
    const f = await Fighter.findOneBy({ id: parseInt(req.params.id) });
    if (!f) return res.status(404).json({ message: "Fighter not found" });

    await Fighter.update({ id: parseInt(req.params.id) }, req.body);
    return res.status(200).json({ message: "Fighter updated" });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

/**
 * @api {delete} /fighter/:id Deletes a Fighter with the given id
 * @apiVersion 0.1.0
 * @apiName FeleteFighter
 * @apiGroup Fighter
 * @apiPermission none
 *
 * @apiParam {Number} id <code>id</code> of the fighter.
 *
 * @apiError FighterNotFound   The <code>id</code> of the Fighter was not found.
 *
 */
export const deleteFighter = async (req: Request, res: Response) => {
  try {
    const f = await Fighter.findOneBy({ id: parseInt(req.params.id) });
    if (!f) return res.status(404).json({ message: "Fighter not found" });

    await Fighter.delete({ id: parseInt(req.params.id) });
    return res.status(200).json({ message: "Fighter deleted" });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

/**
 * @api {get} /fighters/:id/statistics Get a fighter's statistics by id
 * @apiVersion 0.1.0
 * @apiName GetFighterStatistics
 * @apiGroup Fighter
 *
 * @apiParam {Number} id <code>id</code> of the fighter.
 *
 * @apiSuccess {Object} fighter object
 * @apiSuccess {Number} fighter.id Fighter's id
 * @apiSuccess {String} fighter.name Fighter's full name
 * @apiSuccess {Object} statistics object
 * @apiSuccess {Number} statistics.totalFights Total number of fights
 * @apiSuccess {Number} statistics.wins Number of wins
 * @apiSuccess {Number} statistics.losses Number of losses
 *
 * @apiError FighterNotFound   The <code>id</code> of the Fighter was not found.
 *
 */
export const getFighterStatistics = async (req: Request, res: Response) => {
  try {
    const fighterId = parseInt(req.params.id);
    
    // Fetch the fighter along with their fights
    const fighter = await Fighter.findOne({
      where: {
        id: fighterId,
      },
      relations: ["fightsAsWinner", "fightsAsLoser"],
    });
    
    if (!fighter) {
      return res.status(404).json({ message: "Fighter not found" });
    }
    
    const wins = fighter.fightsAsWinner.length;
    const losses = fighter.fightsAsLoser.length;
    const totalFights = wins + losses;

    return res.json({
      fighter: {
        id: fighter.id,
        name: fighter.name,
      },
      statistics: {
        totalFights,
        wins,
        losses,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
