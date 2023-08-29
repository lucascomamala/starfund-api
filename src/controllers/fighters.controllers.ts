import { Request, Response } from "express"
import { ConnectionClosedEvent } from "typeorm"

import { Fighter } from "../entities/Fighter"

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
  } = req.body

  const f = new Fighter()
  f.name = name
  f.wins = wins
  f.losses = losses
  f.knockouts = knockouts
  f.submissions = submissions
  f.weight_class = weight_class
  f.nationality = nationality
  f.team = team
  f.nickname = nickname
  f.date_of_birth = date_of_birth
  f.height_cm = height_cm
  f.last_weight_grams = last_weight_grams
  f.image_path = image_path

  await f.save()

  res.send("createFighter")
}
