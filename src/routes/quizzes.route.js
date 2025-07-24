import express from "express";
import { isAuthenticated } from "../middlewares/users.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import { createQuizController, deleteQuizController, getQuizzesByUserIdController, updateQuizController } from "../controllers/quizzes.controller.js";
import { validateImage } from "../validations/validateImage.validation.js";

const routers = express.Router();

routers.get("/", isAuthenticated, getQuizzesByUserIdController);
routers.delete("/delete-quizzes/:id", isAuthenticated, deleteQuizController);
routers.put("/update-quizzes/:id", isAuthenticated, upload.single("coverImage"), validateImage, updateQuizController);
routers.post("/create-quizzes", isAuthenticated, upload.single("coverImage"), validateImage, createQuizController);

export default routers;
