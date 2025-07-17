import express from "express";
import { isAuthenticated } from "../middlewares/users.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import { createQuizController, deleteQuizController, getQuizzesByUserIdController, updateQuizController } from "../controllers/quizzes.controller.js";

const routers = express.Router();

routers.get("/", isAuthenticated, getQuizzesByUserIdController);
routers.delete("/delete-quizzes/:id", isAuthenticated, deleteQuizController);
routers.put("/update-quizzes/:id", isAuthenticated, upload.single("coverImage"), updateQuizController);
routers.post("/create-quizzes", isAuthenticated, upload.single("coverImage"), createQuizController);

export default routers;
