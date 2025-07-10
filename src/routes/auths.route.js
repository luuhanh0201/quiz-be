import { Router } from "express";
import { signIn, signUp } from "../controllers/auths.controller.js";

const routers = Router();

routers.post("/signup", signUp);
routers.post("/signin", signIn);

export default routers;
