import { Router } from "express";
import {
    getOneClinic,
    insertClinic,
    removeClinic,
    upsertClinic,
    viewAllClinic,
} from "../controller/clinic_controller";
import { checkToken } from "../middleware/auth.middleware";

export const clinicRoutes = Router();

clinicRoutes.post("/clinic/create/", checkToken, insertClinic);
clinicRoutes.put("/clinic/update/:clinicId", checkToken, upsertClinic);
clinicRoutes.delete("/clinic/delete/:clinicId", checkToken, removeClinic);
clinicRoutes.get("/clinic/view-one/:clinicId", checkToken, getOneClinic);
clinicRoutes.get("/clinic/view-all/", checkToken, viewAllClinic);
