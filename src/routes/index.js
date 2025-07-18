import { Router } from "express";
import users from "./users.route.js";
import auths from "./auths.route.js";
import quizzes from "./quizzes.route.js"
const router = Router();
router.use("/users", users);
router.use("/auths", auths);
router.use("/quizzes", quizzes);

export default router;
