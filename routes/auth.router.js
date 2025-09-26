import { Router } from "express";
import authBuilder from "../controllers/auth.controller.js";
const router = Router();

router.post("/login", authBuilder.login);
export default router;
