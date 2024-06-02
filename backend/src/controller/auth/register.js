import db from "../../db/connect.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { generateToken } from './jwt.js';

export const register = async (req, res) => {
  try {
    const username = req.body.username;
    const SALT = process.env.SALT;
    const salt = parseInt(SALT);
    const password = bcrypt.hashSync(req.body.password, salt);
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;

    const existingUser = await db
      .promise()
      .query("SELECT * FROM `users` WHERE username = ?", [username]);
	  
    if (existingUser[0].length > 0) {
      return res
        .status(400)
        .json({ success: false, payload: "Username already exists" });
    }

    const credit_ID = uuidv4();
    const data = [[username, password, firstname, lastname, email]];
	
    const result = await db
      .promise()
      .query(
        "INSERT INTO `users` (`username`, `password`, `firstname`, `lastname`, `email`) VALUES  ?",
        [data]
      );
	const user = await db.promise().query("SELECT * FROM `users` WHERE username = ?", [username])
	const id = user[0][0].id;
	const token = await generateToken(id);
	console.log(token)
	res.cookie('token', token);
    return res
      .status(200)
      .json({ success: true, payload: "register successful" });
  } catch (error) {
    return res.status(400).json({ success: false, payload: error.message });
  }
};
