import db from '../../db/connect.js';
import bcrypt from 'bcrypt';
import { generateToken } from './jwt.js';

export const login = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        db.query(
            'SELECT id ,password FROM `users` WHERE username = ?',
            [username],
            async (err, user) => {
                if (err) {
                    throw err;
                } else {
                    if (user.length === 0) {
                        return res.status(400).send('Username not found');
                    }

                    const passwordMatch = await bcrypt.compare(password, user[0].password);
                    if (!passwordMatch) {
                        return res.status(400).send('Password incorrect');
                    }

                    const id = user[0].id;
                    const token = generateToken(id);
                    res.cookie('token', token);
                    return res.status(200).json({ token: token });
                }
            }
        );
    } catch (error) {
        next();
        return res.status(400).json({
            payload: error,
        });
    }
};
