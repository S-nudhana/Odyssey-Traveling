import connection from "../../db/connect.js";
import { validateToken } from "../auth/jwt.js";

const getPlaceById = async (req, res) => {
  const placeId = req.query.id;
  const { token } = req.cookies;
  const userId = validateToken(token);
  try {
    const dataQuery = await connection
      .promise()
      .query(`SELECT * FROM place WHERE Id = ${placeId}`);
    const dataq2 = await connection
      .promise()
      .query(`SELECT * FROM Favorite WHERE userId = ${userId} and placeId = ${placeId}`);
    let data = dataQuery[0][0];
    let data2 = dataq2[0];
    data = { ...data, favorite: data2.length === 1 };
    if (!data) {
      return res.status(404).json({
        success: false,
        data: null,
        error: "Id not found",
      });
    }
    return res.json({
      success: true,
      data: data,
      error: null,
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      success: false,
      data: null,
      error: error.message,
    });
  }
};
export default getPlaceById;
