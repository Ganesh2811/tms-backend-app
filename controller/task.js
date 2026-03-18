import express from "express";
import { isAdminRoute, protectRoute } from "../middleware/auth.js";
import createTask from "../business/task/createTask.js";
import duplicateTask from "../business/task/duplicateTask.js";
import postTaskActivity from "../business/task/postTaskActivity.js";
import dashboardStatistics from "../business/task/dashboardStatistics.js";
import getTasks from "../business/task/getTasks.js";
import getTask from "../business/task/getTask.js";
import createSubTask from "../business/task/createSubTask.js";
import updateTask from "../business/task/updateTask.js";
import updateTaskStage from "../business/task/updateTaskStage.js";
import updateSubTaskStage from "../business/task/updateSubTaskStage.js";
import trashTask from "../business/task/trashTask.js";
import deleteRestoreTask from "../business/task/deleteRestoreTask.js";

const router = express.Router();

router.post("/create", protectRoute, isAdminRoute, createTask);
router.post("/duplicate/:id", protectRoute, isAdminRoute, duplicateTask);
router.post("/activity/:id", protectRoute, postTaskActivity);

router.get("/dashboard", protectRoute, dashboardStatistics);
router.get("/", protectRoute, getTasks);
router.get("/:id", protectRoute, getTask);

router.put("/create-subtask/:id", protectRoute, isAdminRoute, createSubTask);
router.put("/update/:id", protectRoute, isAdminRoute, updateTask);
// router.put("/change-stage/:id", protectRoute, updateTaskStage);
// router.put("/change-status/:taskId/:subTaskId", protectRoute, updateSubTaskStage);
router.put("/:id", protectRoute, isAdminRoute, trashTask);

router.delete("/delete-restore/:id", protectRoute, isAdminRoute, deleteRestoreTask);

export default router;