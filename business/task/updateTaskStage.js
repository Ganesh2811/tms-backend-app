import asyncHandler from "express-async-handler";
import Task from "../../models/taskModel.js";

const updateTaskStage = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { stage } = req.body;

        const task = await Task.findById(id);

        task.stage = stage.toLowerCase();

        await task.save();

        res
            .status(200)
            .json({ status: true, message: "Task stage changed successfully." });
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
});
export default updateTaskStage;