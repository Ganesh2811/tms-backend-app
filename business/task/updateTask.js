import asyncHandler from "express-async-handler";
import Task from "../../models/taskModel.js";
// import { generateTaskDescription } from "../../common/aiService.js";
import { generateTaskDescription } from "../../common/hfService.js";

const updateTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, date, team, stage, priority, assets, links, description } = req.body;

    try {
        const task = await Task.findById(id);
        if(!task){
            return res.status(404).json({ status: false, message: "Task not found" });
        }
        let newLinks = [];
        if (links) {
            newLinks = links.split(",");
        }
        let finalDescription = task.description;
        if(description){
            const aiDescription = await generateTaskDescription(description);
            finalDescription = `${description}\n\nAI Suggestion: ${aiDescription}`;
        }
        
        if (title) task.title = title;
        if(date) task.date = date;
        if(priority) task.priority = priority.toLowerCase();
        if(assets) task.assets = assets;
        if (stage) task.stage = stage.toLowerCase();
        if(team) task.team = team;
        if(links) task.links = newLinks;
        task.description = finalDescription;

        await task.save();
        res.status(200).json({ status: true, message: "Task duplicated successfully." });
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
});
export default updateTask;