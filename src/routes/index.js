import { Router } from "express";
import users from "./users.route.js";
import auths from "./auths.route.js";
import quizzes from "./quizzes.route.js"
import questions from "./questions.auth.js"
const router = Router();
router.use("/users", users);
router.use("/auths", auths);
router.use("/quizzes", quizzes);
router.use("/questions", questions);
router.use("/health", ((req, res) => {
    return res.status(200).json("OK")
}))
export default router;
