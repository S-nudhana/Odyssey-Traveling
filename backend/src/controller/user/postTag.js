import connection from "../../db/connect.js";
import { validateToken } from "../auth/jwt.js";

const postTag = async (req, res) => {
  try {
    const tag = req.query.tag;
    const { token } = req.cookies;
    const userId = validateToken(token);
    if (!tag) {
      return res.status(400).json({
        success: false,
        data: null,
        error: "Tag cannot be empty.",
      });
    }
    
    const dataQuery = await connection.promise().query(`INSERT INTO userTags (userId, tag) VALUES (?, ?)`, [userId, tag]);
    const data = dataQuery[0];
    
    if (!data) {
      return res.status(404).json({
        success: false,
        data: null,
        error: "Tag insertion failed.",
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

export default postTag;
