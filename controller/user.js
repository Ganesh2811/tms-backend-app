import express from "express";

import { isAdminRoute, protectRoute } from "../middleware/auth.js";
import registerUser from "../business/user/registerUser.js";
import loginUser from "../business/user/loginUser.js";
import logoutUser from "../business/user/logoutUser.js";
import getTeamList from "../business/user/getTeamList.js";
import getNotificationsList from "../business/user/getNotificationsList.js";
import getUserTaskStatus from "../business/user/getUserTaskStatus.js";
import updateUserProfile from "../business/user/updateUserProfile.js";
import markNotificationRead from "../business/user/markNotificationRead.js";
import changeUserPassword from "../business/user/changeUserPassword.js";
import activateUserProfile from "../business/admin/activateUserProfile.js";
import deleteUserProfile from "../business/admin/deleteUserProfile.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/get-team", protectRoute, isAdminRoute, getTeamList);
router.get("/notifications", protectRoute, getNotificationsList);
router.get("/get-status", protectRoute, isAdminRoute, getUserTaskStatus);

router.put("/profile", protectRoute, updateUserProfile);
router.put("/read-noti", protectRoute, markNotificationRead);
router.put("/change-password", protectRoute, changeUserPassword);

// FOR ADMIN ONLY - ADMIN ROUTES
router.route("/:id").put(protectRoute, isAdminRoute, activateUserProfile).delete(protectRoute, isAdminRoute, deleteUserProfile);


export default router;