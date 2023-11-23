import express, { Application, Request, Response } from "express";
import cors from "cors";
import { userRoutes } from "./app/modules/users/user.router";
const app: Application = express();
app.use(cors());

//data parser
app.use(express.json());

//application route
app.use("/api", userRoutes);
app.use("/api", userRoutes);
app.use("/api", userRoutes);
app.use("/api", userRoutes);
app.use("/api", userRoutes);
app.use("/api", userRoutes);
app.use("/api", userRoutes);
app.use("/api", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Assignment two server is running");
});

export default app;
