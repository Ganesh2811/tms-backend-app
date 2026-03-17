import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

import { routeNotFound, errorHandler } from "./middleware/error.js"
import dbconnection from "./common/dbConnection.js";
import userRoutes from "./controller/user.js";
import taskRoutes from "./controller/task.js";

dotenv.config();
dbconnection();

const port = process.env.PORT || 5000;
const app = express();

// cors fix
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// routes
app.use("/api/user", userRoutes); //  /api/user
app.use("/api/task", taskRoutes); //  /api/task

// error handling
app.use(routeNotFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server listening on ${port}`)
});