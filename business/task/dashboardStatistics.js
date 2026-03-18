import asyncHandler from "express-async-handler";
import Task from "../../models/taskModel.js";
import User from "../../models/userModel.js";

const dashboardStatistics = asyncHandler(async (req, res) => {
    try {
        const { userId, isAdmin } = req.user;

        // Fetch all tasks from the database
        const allTasks = isAdmin
            ? await Task.find({
                isTrashed: false,
            })
                .populate({
                    path: "team",
                    select: "name role title email",
                })
                .sort({ _id: -1 })
            : await Task.find({
                isTrashed: false,
                team: { $all: [userId] },
            })
                .populate({
                    path: "team",
                    select: "name role title email",
                })
                .sort({ _id: -1 });

        const users = await User.find({ isActive: true }).select("name title role isActive createdAt") .limit(10).sort({ _id: -1 });

        // Group tasks by stage and calculate counts
        const groupedTasks = allTasks?.reduce((result, task) => {
            const stage = task.stage;

            if (!result[stage]) {
                result[stage] = 1;
            } else {
                result[stage] += 1;
            }

            return result;
        }, {});

        const graphData = Object.entries(
            allTasks?.reduce((result, task) => {
                const { priority } = task;
                result[priority] = (result[priority] || 0) + 1;
                return result;
            }, {})
        ).map(([name, total]) => ({ name, total }));

        // Calculate total tasks
        const totalTasks = allTasks.length;
        const last10Task = allTasks?.slice(0, 10);

        // Combine results into a summary object
        const summary = {
            totalTasks,
            last10Task,
            users: isAdmin ? users : [],
            tasks: groupedTasks,
            graphData,
        };

        res.status(200).json({ status: true, ...summary, message: "Successfully." });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: false, message: error.message });
    }
});

export default dashboardStatistics;