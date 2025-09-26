import { Router } from "express";
import invent from "../controllers/inventory.controller.js";
const router = Router();

router.post("/create", invent.addInvent);
router.post("/search", invent.getInvents);
router.post("/delete", invent.deleteInvent);
router.post("/update", invent.updateInvent);
export default router;
