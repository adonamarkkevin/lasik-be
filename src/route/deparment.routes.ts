import { Router } from "express";
import {
    getOneDept,
    insertDept,
    removeDept,
    upsertDept,
    viewAllDept,
} from "../controller/deparment.controller";
import { checkToken } from "../middleware/auth.middleware";

export const deptRoutes = Router();

deptRoutes.post("/department/create/", checkToken, insertDept);
deptRoutes.put("/department/update/:deptId", checkToken, upsertDept);
deptRoutes.delete("/department/remove/:deptId", checkToken, removeDept);
deptRoutes.get("/department/view-one/:deptId", checkToken, getOneDept);
deptRoutes.get("/department/view-all/", checkToken, viewAllDept);
