import express from "express";
import { getAll, getOneUser, updateUser } from "../controllers/users.controller.js";
import { isAuthenticated } from "../middlewares/users.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const routers = express.Router();

routers.get("/profile-users", isAuthenticated, getAll);
routers.get("/profile-user", isAuthenticated, getOneUser);
routers.put("/profile-user/edit/:id", upload.single("avatar"), isAuthenticated, updateUser);

export default routers;
