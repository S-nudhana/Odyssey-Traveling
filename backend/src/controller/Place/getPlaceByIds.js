import connection from "../../db/connect.js";
import { validateToken } from "../auth/jwt.js";

const getPlaceByIds = async (req, res) => {
  const placeId = req.query.id;
  try {
    const dataQuery = await connection
      .promise()
      .query(`SELECT * FROM place WHERE Id = ${placeId}`);
    const data = dataQuery[0][0];
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
export default getPlaceByIds;
