import { Router } from "express";
import {
    addPatientClass,
    getOneClass,
    removeClass,
    updateClass,
    viewAllClass,
} from "../controller/patient_class.controller";
import { checkToken } from "../middleware/auth.middleware";

export const pClassRoutes = Router();

pClassRoutes.post("/patient-class/create", checkToken, addPatientClass);
pClassRoutes.put("/patient-class/update/:pClassId/", checkToken, updateClass);
pClassRoutes.delete(
    "/patient-class/remove/:pClassId/",
    checkToken,
    removeClass,
);
pClassRoutes.get("/patient-class/view-one/:pClassId/", checkToken, getOneClass);
pClassRoutes.get("/patient-class/view-all/", checkToken, viewAllClass);
