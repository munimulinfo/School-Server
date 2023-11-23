"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_router_1 = require("./app/modules/users/user.router");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
//data parser
app.use(express_1.default.json());
//application route
app.use("/api", user_router_1.userRoutes);
app.use("/api", user_router_1.userRoutes);
app.use("/api", user_router_1.userRoutes);
app.use("/api", user_router_1.userRoutes);
app.use("/api", user_router_1.userRoutes);
app.use("/api", user_router_1.userRoutes);
app.use("/api", user_router_1.userRoutes);
app.use("/api", user_router_1.userRoutes);
app.get("/", (req, res) => {
    res.send("Assignment two server is running");
});
exports.default = app;
