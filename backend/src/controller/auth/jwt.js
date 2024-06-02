import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWTSecretKey = process.env.JWTSecretKey;

export const generateToken = (id) => {
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      userId: id,
    },
    JWTSecretKey
  );
  return token;
};

export const validateToken = (token) => {
  const id = jwt.verify(token, JWTSecretKey);
  return id.userId;
};

export const checkauth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (token) {
      if (!jwt.verify(token, JWTSecretKey)) {
        throw "Unable to verify cookie";
      }
    } else {
      throw "Cookie is not exist";
    }
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
