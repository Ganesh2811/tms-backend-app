import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";

const deleteUserProfile = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ status: true, message: "User deleted successfully" });
});

export default deleteUserProfile;