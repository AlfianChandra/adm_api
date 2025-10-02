import { Router } from "express";
import userBuilder from "../controllers/user.controller.js";
import { isAlreadyLoggedIn } from "../middlewares/authverifier.middleware.js";
const router = Router();

router.post("/register", userBuilder.register);
export default router;
