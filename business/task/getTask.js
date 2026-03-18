import asyncHandler from "express-async-handler";
import Task from "../../models/taskModel.js";

const getTask = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id)
            .populate({
                path: "team",
                select: "name title role email",
            })
            .populate({
                path: "activities.by",
                select: "name",
            })
            .sort({ _id: -1 });

        res.status(200).json({
            status: true,
            task,
        });
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch task", error);
    }
});
export default getTask;