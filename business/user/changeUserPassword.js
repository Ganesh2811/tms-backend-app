import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";

const changeUserPassword = asyncHandler(async (req, res) => {
    const { userId } = req.user;

    // Remove this condition
    // if (userId === "65ff94c7bb2de638d0c73f63") {
    //     return res.status(404).json({
    //         status: false,
    //         message: "This is a test user. You can not chnage password. Thank you!!!",
    //     });
    // }

    const user = await User.findById(userId);

    if (user) {
        user.password = req.body.password;
        await user.save();
        user.password = undefined;
        res.status(200).json({
            status: true,
            message: `Password chnaged successfully.`,
        });
    } else {
        res.status(404).json({ status: false, message: "User not found" });
    }
});

export default changeUserPassword;