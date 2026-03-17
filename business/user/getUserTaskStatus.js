import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";

const getUserTaskStatus = asyncHandler(async (req, res) => {
    const tasks = await User.find().populate("tasks", "title stage").sort({ _id: -1 });
    res.status(200).json(tasks);
});

export default getUserTaskStatus;