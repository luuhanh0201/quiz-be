import express from "express";
import { getAll } from "../controllers/users.controller.js";
import { isAuthenticated } from "../middlewares/users.middleware.js";

const routers = express.Router();

routers.get("/profile-users", isAuthenticated, getAll);

export default routers;
