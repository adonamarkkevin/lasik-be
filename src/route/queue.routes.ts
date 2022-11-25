import { Router } from "express";
import { clearQueue, viewAllQueue } from "../controller/queue.controller";
import { checkToken } from "../middleware/auth.middleware";

export const queueRoutes = Router();

queueRoutes.get("/queue/view-all/", checkToken, viewAllQueue);
queueRoutes.delete("/queue/clear/", checkToken, clearQueue);
