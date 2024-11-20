import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    
    //Access the token from the cookies
    const token = req.cookies.token;

    if (!token) {
        res.status(401).json({ message: "Access Denied" });
        return;
    }

    const secretToken = process.env.JWT_SECRET;
    if (!secretToken) {
        console.log("Secret token", secretToken);
        res.status(404).json({ message: "JWT_SECRET not found" });
        return;
    }

    try {
        const user = jwt.verify(token, secretToken);
        console.log("Decoded user:", user);
        // Adding user to req:
        (req as any).user = user; // Temporary solution to avoid TypeScript errors
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid Token" });
    }
};