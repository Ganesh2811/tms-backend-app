import asyncHandler from "express-async-handler";
import Task from "../../models/taskModel.js";

const updateTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, date, team, stage, priority, assets, links, description } =
        req.body;

    try {
        const task = await Task.findById(id);

        let newLinks = [];

        if (links) {
            newLinks = links.split(",");
        }

        task.title = title;
        task.date = date;
        task.priority = priority.toLowerCase();
        task.assets = assets;
        task.stage = stage.toLowerCase();
        task.team = team;
        task.links = newLinks;
        task.description = description;

        await task.save();

        res.status(200).json({ status: true, message: "Task duplicated successfully." });
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
});
export default updateTask;