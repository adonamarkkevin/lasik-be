import { Router } from "express";
import {
    getOneSrvc,
    insertSrvc,
    removeSrvc,
    updateSrvc,
    viewAllSrvc,
} from "../controller/services.controller";
import { checkToken } from "../middleware/auth.middleware";

export const srvcRoutes = Router();

srvcRoutes.post("/service/create", checkToken, insertSrvc);
srvcRoutes.put("/service/update/:srvcId", checkToken, updateSrvc);
srvcRoutes.delete("/service/remove/:srvcId", checkToken, removeSrvc);
srvcRoutes.get("/service/view-one/:srvcId", checkToken, getOneSrvc);
srvcRoutes.get("/service/view-all", checkToken, viewAllSrvc);
