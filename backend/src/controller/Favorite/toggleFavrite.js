import db from "../../db/connect.js";
import { validateToken } from "../auth/jwt.js";

export const toggleFavorite = async (req, res) => {
  const placeId = req.body.placeId;
  const { token } = req.cookies;
  const userId = validateToken(token);
  try {
    const [existingFavorite] = await db
      .promise()
      .query("SELECT * FROM `Favorite` WHERE `userId` = ? AND `placeId` = ?", [
        userId,
        placeId,
      ]);

    if (existingFavorite.length > 0) {
      await db
        .promise()
        .query("DELETE FROM `Favorite` WHERE `userId` = ? AND `placeId` = ?", [
          userId,
          placeId,
        ]);
      return res
        .status(200)
        .json({ success: true, message: "Favorite removed" });
    } else {
      await db
        .promise()
        .query("INSERT INTO `Favorite` (`userId`, `placeId`) VALUES (?, ?)", [
          userId,
          placeId,
        ]);
      return res.status(200).json({ success: true, message: "Favorite added" });
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
