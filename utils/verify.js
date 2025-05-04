import jwt from 'jsonwebtoken';
import {CreateError} from './error.js';

export const VerifyTodo = async (req, res,next) => {
    const token = req.headers.authorization || req.cookies?.token;
    console.log(token);
    if (!token) {
        return next(CreateError(401 ,"Not Authenticated !"));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return next(CreateError(403), "Token is not valid!");
        req.user= user;
        next();
    })
}

