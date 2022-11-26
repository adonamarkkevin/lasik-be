import { Router } from "express";
import {
    getOneTpp,
    insertTpp,
    removeTpp,
    upsertTpp,
    viewAllTpp,
} from "../controller/third_party_provider.controller";
import { checkToken } from "../middleware/auth.middleware";

export const tppRoutes = Router();

tppRoutes.post("/provider/create/", checkToken, insertTpp);
tppRoutes.put("/provider/update/:tppId", checkToken, upsertTpp);
tppRoutes.delete("/provider/remove/:tppId", checkToken, removeTpp);
tppRoutes.get("/provider/view-one/:tppId", checkToken, getOneTpp);
tppRoutes.get("/provider/view-all/:pClassId", checkToken, viewAllTpp);
