import { Router } from "express";
import {
    addPatient,
    getOnePatient,
    removePatient,
    updatePatient,
    viewAllPatient,
} from "../controller/patient.controller";
import { checkToken } from "../middleware/auth.middleware";

export const patientRoutes = Router();

patientRoutes.post("/patient/create/", checkToken, addPatient);
patientRoutes.get("/patient/view-all/", checkToken, viewAllPatient);
patientRoutes.get("/patient/view-one/:patientId/", checkToken, getOnePatient);
patientRoutes.put("/patient/update/:patientId/", checkToken, updatePatient);
patientRoutes.delete("/patient/remove/:patientId/", checkToken, removePatient);
