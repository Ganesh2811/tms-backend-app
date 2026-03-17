import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { routeNotFound, errorHandler } from "./middlewares/errorMiddleware.js"
import dbconnection from "./common/dbConnection.js";
import routes from "./routes/index.js"

dotenv.config();

dbconnection();

const port = process.env.PORT || 5000;
const app = express();


app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    method: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api", routes);

app.use(routeNotFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server listening on ${port}`)
});