import connection from "../../db/connect.js";
import { validateToken } from "../auth/jwt.js";

const updateUsername = async (req, res) => {
  const { token } = req.cookies;
  const userId = validateToken(token);
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({
      success: false,
      data: null,
      error: "Username is required",
    });
  }

  try {
    const [updateResult] = await connection
      .promise()
      .query(`UPDATE users SET username = ? WHERE id = ?`, [username, userId]);

    if (updateResult.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        data: null,
        error: "Id not found",
      });
    }

    const dataQuery = await connection
      .promise()
      .query(
        `SELECT username, firstname, lastname, email FROM users WHERE id = ${userId}`
      );
    const updatedData = dataQuery[0];

    return res.json({
      success: true,
      data: updatedData,
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
export default updateUsername;