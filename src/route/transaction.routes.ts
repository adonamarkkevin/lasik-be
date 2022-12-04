import { Router } from "express";
import {
    insertTransaction,
    processTrans,
    removeTrans,
    updateTransPckg,
    updateTransSrvc,
    viewAllTransaction,
    viewBillSummaryPerDate,
    viewInvoiceSummaryPerDate,
    viewTransPkcg,
    viewTransSvc,
} from "../controller/transaction.controller";
import { adminCheck, checkToken } from "../middleware/auth.middleware";

export const transRoutes = Router();

transRoutes.post(
    "/transaction/create",
    checkToken,
    adminCheck,
    insertTransaction,
);
transRoutes.put(
    "/transaction/process/:transId",
    checkToken,
    adminCheck,
    processTrans,
);
transRoutes.get("/transaction/view-all", checkToken, viewAllTransaction);
transRoutes.delete(
    "/transaction/remove/:transId",
    checkToken,
    adminCheck,
    removeTrans,
);
transRoutes.put(
    "/transaction/update/package/:pckgId",
    checkToken,
    adminCheck,
    updateTransPckg,
);
transRoutes.put(
    "/transaction/update/service/:srvcId",
    checkToken,
    adminCheck,
    updateTransSrvc,
);
transRoutes.get(
    "/transaction/view-one/package/:pckgId",
    checkToken,
    adminCheck,
    viewTransPkcg,
);
transRoutes.get(
    "/transaction/view-one/service/:srvcId",
    checkToken,
    adminCheck,
    viewTransSvc,
);
transRoutes.post(
    "/transaction/view-all/billing",
    checkToken,
    adminCheck,
    viewBillSummaryPerDate,
);
transRoutes.post(
    "/transaction/view-all/invoice",
    checkToken,
    adminCheck,
    viewInvoiceSummaryPerDate,
);
