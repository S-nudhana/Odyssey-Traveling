import express from 'express';
import { login } from '../controller/auth/login.js'
import { register } from '../controller/auth/register.js';

const authRouter = express.Router();

authRouter.post('/login' , login);
authRouter.post('/register', register);

export default authRouter;