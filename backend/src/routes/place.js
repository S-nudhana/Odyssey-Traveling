import express from 'express';
import getAllplaces from '../controller/Place/getAllplaces.js';
import getPlaceById from '../controller/Place/getPlaceById.js'
import getPlaceByIds from '../controller/Place/getPlaceByIds.js'
import getPlaceImage from '../controller/Place/getPlaceImage.js';

const placeRouter = express.Router();

placeRouter.get('/all', getAllplaces);
placeRouter.get('/id' , getPlaceById);
placeRouter.get('/ids' , getPlaceByIds);
placeRouter.get('/pic' , getPlaceImage);

export default placeRouter;