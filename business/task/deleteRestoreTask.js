import asyncHandler from "express-async-handler";
import Task from "../../models/taskModel.js";

const deleteRestoreTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { actionType } = req.query;

    if (!actionType) {
        return res.status(400).json({
            status: false,
            message: "actionType is required",
        });
    }

    if (actionType === "delete") {
        if (!id) {
            return res.status(400).json({
                status: false,
                message: "Task ID is required for delete",
            });
        }

        await Task.findByIdAndUpdate(id, { isTrashed: true });
    }

    else if (actionType === "deleteAll") {
        await Task.updateMany({}, { $set: { isTrashed: true } });
    }

    else if (actionType === "restore") {
        if (!id) {
            return res.status(400).json({
                status: false,
                message: "Task ID is required for restore",
            });
        }
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({
                status: false,
                message: "Task not found",
            });
        }
        task.isTrashed = false;
        await task.save();
    }

    else if (actionType === "restoreAll") {
        await Task.updateMany(
            { isTrashed: true },
            { $set: { isTrashed: false } }
        );
    }

    else {
        return res.status(400).json({
            status: false,
            message: "Invalid actionType",
        });
    }

    res.status(200).json({
        status: true,
        message: "Operation performed successfully",
    });
});

export default deleteRestoreTask;