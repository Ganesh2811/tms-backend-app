import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";

const getTeamList = asyncHandler(async (req, res) => {
    const { search } = req.query;
    let query = {};

    if (search) {
        const searchQuery = {
            $or: [
                { title: { $regex: search, $options: "i" } },
                { name: { $regex: search, $options: "i" } },
                { role: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
            ],
        };
        query = { ...query, ...searchQuery };
    }
    const user = await User.find(query).select("name title role email isActive");
    res.status(200).json(user);
});

export default getTeamList;