import jwt from 'jsonwebtoken';
import db from '../models';

export const auth = async (req, res, next) => {
    const token = req.headers.authorization;
    try {
        const decoded = jwt.verify(token, 'shhhhh');
        const id = decoded.id;
        req.currentUser = id;
        next();
    } catch (err) {
        return res.status(401).json('Require Signin');
    }
};
