import { Router } from "express";
import {
    insertTransaction,
    processTrans,
    removeTrans,
    updateTransPckg,
    viewAllTransaction,
    viewTransPkcg,
    viewTransSvc,
} from "../controller/transaction.controller";
import { checkToken } from "../middleware/auth.middleware";

export const transRoutes = Router();

transRoutes.post("/transaction/create", checkToken, insertTransaction);
transRoutes.put("/transaction/process/:transId", checkToken, processTrans);
transRoutes.get("/transaction/view-all", checkToken, viewAllTransaction);
transRoutes.delete("/transaction/remove/:transId", checkToken, removeTrans);
transRoutes.put(
    "/transaction/update/package/:pckgId",
    checkToken,
    updateTransPckg,
);
transRoutes.put(
    "/transaction/update/service/:srvcId",
    checkToken,
    updateTransPckg,
);
transRoutes.get(
    "/transaction/view-one/package/:pckgId",
    checkToken,
    viewTransPkcg,
);
transRoutes.get(
    "/transaction/view-one/service/:srvcId",
    checkToken,
    viewTransSvc,
);
