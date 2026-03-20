import jwt from "jsonwebtoken";
import redisClient from "./redisClient.js"

const createToken = async (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });

    await redisClient.set(`token:${userId}`, token, { EX: 60 * 60 * 24 })

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
    });
};

export default createToken;