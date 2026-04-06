import asyncHandler from "express-async-handler";
import Task from "../../models/taskModel.js";
import Notice from "../../models/notificationModel.js";
import User from "../../models/userModel.js";
// import { generateTaskDescription } from "../../common/aiService.js";
import { generateTaskDescription } from "../../common/hfService.js";

const createTask = async (req, res) => {
    try {
        const { userId } = req.user;
        const { title, team, stage, date, priority, assets, links, description } = req.body;

        //alert users of the task
        let text = "New task has been assigned to you";
        if (team?.length > 1) {
            text = text + ` and ${team?.length - 1} others.`;
        }

        text =
            text +
            ` The task priority is set a ${priority} priority, so check and act accordingly. The task date is ${new Date(
                date
            ).toDateString()}. Thank you!!!`;

        const activity = {
            type: "assigned",
            activity: text,
            by: userId,
        };
        let newLinks = null;

        if (links) {
            newLinks = links?.split(",");
        }

        let aiDescription = await generateTaskDescription(title);
        let finalDescription = description ? `${description}\n\nAI Suggestion: ${aiDescription}` : aiDescription;
        const task = await Task.create({
            title,
            team,
            stage: stage.toLowerCase(),
            date,
            priority: priority.toLowerCase(),
            assets,
            activities: activity,
            links: newLinks || [],
            description: finalDescription
        });

        await Notice.create({
            team,
            text,
            task: task._id,
        });

        const users = await User.find({
            _id: team,
        });

        if (users) {
            for (let i = 0; i < users.length; i++) {
                const user = users[i];

                await User.findByIdAndUpdate(user._id, { $push: { tasks: task._id } });
            }
        }

        res.status(200).json({ status: true, task, message: "Task created successfully." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: error.message });
    }
};

export default createTask;