import express from "express";
import { toggleFavorite } from "../controller/Favorite/toggleFavrite.js";
import getFavorite from "../controller/Favorite/getFavorite.js";

const favorietRouter = express.Router();

favorietRouter.post("/toggle", toggleFavorite);
favorietRouter.get('/all',getFavorite)

export default favorietRouter;
