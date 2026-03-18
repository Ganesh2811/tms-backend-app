import asyncHandler from "express-async-handler";
import Task from "../../models/taskModel.js";

const trashTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id);
        task.isTrashed = true;
        await task.save();
        res.status(200).json({
            status: true,
            message: `Task trashed successfully.`,
        });
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
});
export default trashTask;