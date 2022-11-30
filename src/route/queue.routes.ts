import { Router } from "express";
import {
    assignDoctorOnQ,
    clearAllInternalQ,
    clearQueue,
    updateInternalQ,
    updateQueueStatus,
    viewAllInternalQ,
    viewAllQueue,
} from "../controller/queue.controller";
import {
    adminCheck,
    checkToken,
    doctorCheck,
} from "../middleware/auth.middleware";

export const queueRoutes = Router();

queueRoutes.get("/queue/view-all/", checkToken, viewAllQueue);
queueRoutes.get("/queue/internal/view-all", checkToken, viewAllInternalQ);
queueRoutes.delete(
    "/queue/clear/",
    checkToken,
    adminCheck,
    adminCheck,
    clearQueue,
);
queueRoutes.delete(
    "/queue/internal/clear/",
    checkToken,
    adminCheck,
    clearAllInternalQ,
);
queueRoutes.put(
    "/queue/internal/assign-doctor/:queue_id",
    checkToken,
    doctorCheck,
    assignDoctorOnQ,
);
queueRoutes.put(
    "/queue/update/:queue_id",
    checkToken,
    adminCheck,
    updateQueueStatus,
);
queueRoutes.put(
    "/queue/internal/update/:queue_id",
    checkToken,
    adminCheck,
    updateInternalQ,
);
