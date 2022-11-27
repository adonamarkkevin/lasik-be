import { Router } from "express";
import {
    getOnePckg,
    insertPckg,
    removePckg,
    upsertPckg,
    viewAllPckg,
} from "../controller/packages.controller";
import { checkToken } from "../middleware/auth.middleware";

export const pckgRoutes = Router();

pckgRoutes.post("/package/create/", checkToken, insertPckg);
pckgRoutes.put("/package/update/:pckgId/", checkToken, upsertPckg);
pckgRoutes.delete("/package/remove/:pckgId/", checkToken, removePckg);
pckgRoutes.get("/package/view-one/:pckgId/", checkToken, getOnePckg);
pckgRoutes.get("/package/view-all/", checkToken, viewAllPckg);
