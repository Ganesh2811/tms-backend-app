import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";

const activateUserProfile = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);

    if (user) {
        user.isActive = req.body.isActive;
        await user.save();
        user.password = undefined;
        res.status(200).json({
            status: true,
            message: `User account has been ${user?.isActive ? "activated" : "disabled" }`,
        });
    } else {
        res.status(404).json({ status: false, message: "User not found" });
    }
});

export default activateUserProfile;