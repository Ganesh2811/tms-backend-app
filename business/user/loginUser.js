import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";
import createToken from "../../common/token.js";

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user){
        return res.status(401).json({ status: false, message: "Invalid email or password." });
    }

    if (!user?.isActive) {
        return res.status(401).json({
            status: false,
            message: "User account has been deactivated, contact the administrator",
        });
    }

    const isMatch = await user.matchPassword(password);

    if (user && isMatch) {
        await createToken(res, user._id);
        user.password = undefined;
        res.status(200).json(user);
    } else {
        return res.status(401).json({ status: false, message: "Invalid email or password" });
    }
});
export default loginUser;