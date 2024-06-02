import connection from "../../db/connect.js";

const getPlaceImage = async (req, res) => {
  const placeId = req.query.placeId;
  try {
    const dataQuery = await connection
      .promise()
      .query(`SELECT picture FROM placeImage WHERE placeId = ${placeId}`);
    const data = dataQuery[0];
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
export default getPlaceImage;
