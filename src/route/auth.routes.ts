import { Router } from "express";
import {
    changePassword,
    getCurrentUser,
    loginUser,
    registerUser,
} from "../controller/auth.controller";
import { checkToken } from "../middleware/auth.middleware";

export const authRoutes = Router();

authRoutes.post("/auth/register/", registerUser);
authRoutes.post("/auth/login/", loginUser);
authRoutes.get("/auth/get/current-user/", checkToken, getCurrentUser);
authRoutes.put("/auth/change-password", checkToken, changePassword);
