import { Router } from "express";
import {
    addLasikUser,
    getOneUser,
    rmLasikUser,
    updateLasikUser,
    viewAllUser,
} from "../controller/admin.controller";
import { adminCheck, checkToken } from "../middleware/auth.middleware";

export const adminRoutes = Router();

adminRoutes.post("/admin/user/create/", checkToken, adminCheck, addLasikUser);
adminRoutes.put("/admin/user/update/:userId", checkToken, updateLasikUser);
adminRoutes.get("/admin/user/view-one/:userId", checkToken, getOneUser);
adminRoutes.get("/admin/user/view-all/", checkToken, viewAllUser);
adminRoutes.delete(
    "/admin/user/remove/:userId",
    checkToken,
    adminCheck,
    rmLasikUser,
);
