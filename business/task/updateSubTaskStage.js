import asyncHandler from "express-async-handler";
import Task from "../../models/taskModel.js";
import Notice from "../../models/notificationModel.js";
import User from "../../models/userModel.js";


const updateSubTaskStage = asyncHandler(async (req, res) => {
    try {
        const { taskId, subTaskId } = req.params;
        const { status } = req.body;

        await Task.findOneAndUpdate(
            {
                _id: taskId,
                "subTasks._id": subTaskId,
            },
            {
                $set: {
                    "subTasks.$.isCompleted": status,
                },
            }
        );

        res.status(200).json({
            status: true,
            message: status
                ? "Task has been marked completed"
                : "Task has been marked uncompleted",
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
});
export default updateSubTaskStage;