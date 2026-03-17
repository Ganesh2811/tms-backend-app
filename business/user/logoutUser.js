import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import redisClient from "../../common/redisClient.js";

const logoutUser = asyncHandler(async (req, res) => {
    try {
        const token = req?.cookies?.token;
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            await redisClient.del(`token:${decoded.userId}`);
        }
    }
    catch (err) {
        console.log("Invalid token during logout");
    }

    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "none",
        secure: process.env.NODE_ENV !== "development",
    });
    res.status(200).json({ message: "Logged out successfully" });
});

export default logoutUser;