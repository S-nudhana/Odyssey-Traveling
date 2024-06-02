import express from 'express';
import getUser from "../controller/user/getUser.js"
import UpdateUsername from "../controller/user/updateUsername.js"
import postTag from '../controller/user/postTag.js';
import getTag from '../controller/user/getTag.js';

const userRouter = express.Router();

userRouter.get('/profile' , getUser);
userRouter.put('/updateUsername' , UpdateUsername);
userRouter.post('/postTag' , postTag);
userRouter.get('/tag',getTag)

export default userRouter;