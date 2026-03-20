import Task from "../../models/taskModel.js";
import Notice from "../../models/notificationModel.js";

const duplicateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.user;
        const task = await Task.findById(id);

        //alert users of the task
        let text = "New task has been assigned to you";
        if (task.team?.length > 1) {
            text = text + ` and ${task.team?.length - 1} others.`;
        }

        text =
            text +
            ` The task priority is set a ${task.priority
            } priority, so check and act accordingly. The task date is ${new Date(
                task.date
            ).toDateString()}. Thank you!!!`;

        const activity = {
            type: "assigned",
            activity: text,
            by: userId,
        };

        const newTask = await Task.create({
            ...task,
            title: "Duplicate - " + task.title,
        });

        newTask.team = task.team;
        newTask.subTasks = task.subTasks;
        newTask.assets = task.assets;
        newTask.links = task.links;
        newTask.priority = task.priority;
        newTask.stage = task.stage;
        newTask.activities = activity;
        newTask.description = task.description;

        await newTask.save();
        await Notice.create({
            team: newTask.team,
            text,
            task: newTask._id,
        });

        res.status(200).json({ status: true, message: "Task duplicated successfully." });
    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
};

export default duplicateTask;