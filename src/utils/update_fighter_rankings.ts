
import { Fighter } from "../entities/Fighter";
import { Ranking } from "../entities/Ranking";
import { AppDataSource } from "../db";

export async function updateFighterRankings(
  winnerId: number,
  loserId: number
): Promise<void> {
  console.log("Updating fighter rankings...");

  await AppDataSource.transaction(async (transactionalEntityManager) => {
    // Find our winner and our loser from the database
    const winner = await transactionalEntityManager.findOne(Fighter, {
      where: {
        id: winnerId,
      },
      relations: ["rankings"],
    });

    const loser = await transactionalEntityManager.findOne(Fighter, {
      where: {
        id: loserId,
      },
      relations: ["rankings"],
    });

    if (winner && loser) {
      const winnerRank = winner.rankings[0];
      const loserRank = loser.rankings[0];

      // Calculates the new rankings, ideally should be a more robust algorithm 
      // that takes into account both fighters' current rankings, the win type, etc
      const newWinnerRank = Math.max(1, winnerRank.rank - 1);
      const newLoserRank = loserRank.rank + 1;

      // Update rankings using transactionalEntityManager
      await transactionalEntityManager.update(Ranking, winnerRank.id, {
        rank: newWinnerRank,
      });
      await transactionalEntityManager.update(Ranking, loserRank.id, {
        rank: newLoserRank,
      });

      console.log("Fighter rankings updated successfully.");
    }
  }).catch((error) => {
    console.error("Error updating fighter rankings:", error);
  });
}
