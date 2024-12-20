import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

//Routes Import
import userRouter from "./routes/user.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";
import subjectRouter from "./routes/subject.routes.js";

//Routes Declaration
app.use("/api/v1/users", userRouter);

//Dashboard Routes
app.use('/api/v1/dashboard', dashboardRouter);

//Subject Routes
app.use('/api/v1/subjects', subjectRouter);


app.use(errorHandler);

export { app };