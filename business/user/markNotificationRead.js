import asyncHandler from "express-async-handler";
import Notice from "../../models/notificationModel.js";

const markNotificationRead = asyncHandler(async (req, res) => {
    try {
        const { userId } = req.user;
        const { isReadType, id } = req.query;

        if (isReadType === "all") {
            await Notice.updateMany(
                { team: userId, isRead: { $nin: [userId] } },
                { $push: { isRead: userId } },
                { new: true }
            );
        } else {
            await Notice.findOneAndUpdate(
                { _id: id, isRead: { $nin: [userId] } },
                { $push: { isRead: userId } },
                { new: true }
            );
        }
        res.status(200).json({ status: true, message: "Done" });
    } catch (error) {
        console.log(error);
    }
});

export default markNotificationRead;