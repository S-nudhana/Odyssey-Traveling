import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import db from "./db/connect.js";
const app = express();
import authRouter from "./routes/auth.js";
import { checkauth } from "./controller/auth/jwt.js";
import placeRouter from "./routes/place.js";
import favorietRouter from "./routes/Favorite.js";
import userRouter from "./routes/user.js";
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
db.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

app.use(cookieParser());
app.use(express.json());

app.use("/api/place", placeRouter);
app.use("/api/auth", authRouter);
app.use("/api/fav", checkauth, favorietRouter);
app.use("/api/user", checkauth, userRouter);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
