import asyncHandler from "express-async-handler";
import Task from "../../models/taskModel.js";

const createSubTask = async (req, res) => {
    const { title, tag, date } = req.body;
    const { id } = req.params;

    try {
        const newSubTask = {
            title,
            date,
            tag,
            isCompleted: false,
        };

        const task = await Task.findById(id);

        task.subTasks.push(newSubTask);

        await task.save();

        res.status(200).json({ status: true, message: "SubTask added successfully." });
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
};
export default createSubTask;