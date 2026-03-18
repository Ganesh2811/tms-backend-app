import asyncHandler from "express-async-handler";
import Task from "../../models/taskModel.js";

const getTasks = asyncHandler(async (req, res) => {
    const { userId, isAdmin } = req.user;
    const { stage, isTrashed, search } = req.query;

    let query = { isTrashed: isTrashed ? true : false };

    if (!isAdmin) {
        query.team = { $all: [userId] };
    }
    if (stage) {
        query.stage = stage;
    }

    if (search) {
        const searchQuery = {
            $or: [
                { title: { $regex: search, $options: "i" } },
                { stage: { $regex: search, $options: "i" } },
                { priority: { $regex: search, $options: "i" } },
            ],
        };
        query = { ...query, ...searchQuery };
    }

    let queryResult = Task.find(query)
        .populate({
            path: "team",
            select: "name title email",
        })
        .sort({ _id: -1 });

    const tasks = await queryResult;

    res.status(200).json({
        status: true,
        tasks,
    });
});
export default getTasks;