import express from "express";
import { createQuestionWithAnswerController } from "../controllers/question.controller.js";
import { isAuthenticated } from "../middlewares/users.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import { validateImage } from "../validations/validateImage.validation.js";
const routers = express.Router();
routers.post("/create-question", isAuthenticated, upload.single("image"), validateImage, createQuestionWithAnswerController);

export default routers;
