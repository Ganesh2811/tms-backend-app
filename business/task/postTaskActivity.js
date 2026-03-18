import asyncHandler from "express-async-handler";
import Task from "../../models/taskModel.js";

const postTaskActivity = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { userId } = req.user;
    const { type, activity } = req.body;

    try {
        const task = await Task.findById(id);
        const data = {
            type,
            activity,
            by: userId,
        };
        task.activities.push(data);
        await task.save();
        res.status(200).json({ status: true, message: "Activity posted successfully." });
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
});
export default postTaskActivity;