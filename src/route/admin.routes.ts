import { Router } from "express";
import {
    addLasikUser,
    getOneUser,
    rmLasikUser,
    updateLasikUser,
    viewAllUser,
    viewUserPerRole,
} from "../controller/admin.controller";
import { adminCheck, checkToken } from "../middleware/auth.middleware";

export const adminRoutes = Router();

adminRoutes.post("/admin/user/create/", checkToken, adminCheck, addLasikUser);
adminRoutes.get("/admin/user/view-one/:userId", checkToken, getOneUser);
adminRoutes.get("/admin/user/view-all/", checkToken, viewAllUser);
adminRoutes.put("/admin/user/update/:userId", checkToken, updateLasikUser);
adminRoutes.delete(
    "/admin/user/remove/:userId",
    checkToken,
    adminCheck,
    rmLasikUser,
);
adminRoutes.get("/user/view-per-role/:role/", checkToken, viewUserPerRole);
