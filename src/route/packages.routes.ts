import { Router } from "express";
import {
    insertPckg,
    removePckg,
    upsertPckg,
} from "../controller/packages.controller";
import { checkToken } from "../middleware/auth.middleware";

export const pckgRoutes = Router();

pckgRoutes.post("/package/create", checkToken, insertPckg);
pckgRoutes.put("/package/update/:pckgId/", checkToken, upsertPckg);
pckgRoutes.delete("/package/remove/:pckgId/", checkToken, removePckg);
pckgRoutes.post("/package/view-one/:pckgId/", checkToken, insertPckg);
pckgRoutes.post("/package/view-all/", checkToken, insertPckg);
