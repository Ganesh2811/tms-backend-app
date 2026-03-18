import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";
import createToken from "../../common/token.js";

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, isAdmin, role, title } = req?.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
        return res.status(400).json({ status: false, message: "Email address already exists" });
    }
    const user = await User.create({ name, email, password, isAdmin, role, title});

    if (user) {
        isAdmin ? await createToken(res, user?._id) : null;
        user.password = undefined;
        res.status(200).json(user);
    } else {
        return res.status(400).json({ status: false, message: "Invalid user data" });
    }

});

export default registerUser;