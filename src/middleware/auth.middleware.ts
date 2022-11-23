import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
const config = process.env;

export const generateToken = (data: any) => {
    if (!data) return undefined;

    const payload = {
        id: data.id,
        role: data.role,
    };

    return jwt.sign(payload, config.ACCESS_TOKEN_SECRET, { expiresIn: "8h" });
};

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
    //Get the jwt token from the head
    // const token = <string>req.headers["auth"];
    let token =
        <string>req.body.token ||
        <string>req.query.token ||
        <string>req.headers["x-access-token"] ||
        <string>req.headers["authorization"];

    if (req.headers["authorization"]) {
        token = token.replace("Bearer ", "");
    }

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = <any>jwt.verify(token, config.ACCESS_TOKEN_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }

    return next();
};
