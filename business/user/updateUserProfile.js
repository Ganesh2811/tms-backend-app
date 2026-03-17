import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";

const updateUserProfile = asyncHandler(async (req, res) => {
    const { userId, isAdmin } = req.user;
    const { _id } = req.body;

    const id =
        isAdmin && userId === _id
            ? userId
            : isAdmin && userId !== _id
                ? _id
                : userId;

    const user = await User.findById(id);

    if (user) {
        user.name = req.body.name || user.name;
        // user.email = req.body.email || user.email;
        user.title = req.body.title || user.title;
        user.role = req.body.role || user.role;

        const updatedUser = await user.save();

        user.password = undefined;

        res.status(201).json({
            status: true,
            message: "Profile Updated Successfully.",
            user: updatedUser,
        });
    } else {
        res.status(404).json({ status: false, message: "User not found" });
    }
});

export default updateUserProfile;