import asyncHandler from "express-async-handler";
import Notice from "../../models/notificationModel.js";

const getNotificationsList = asyncHandler(async (req, res) => {
    const { userId } = req.user;
    const notice = await Notice.find({ team: userId, isRead: { $nin: [userId] }}).populate("task", "title").sort({ _id: -1 });
    res.status(200).json(notice);
});

export default getNotificationsList;