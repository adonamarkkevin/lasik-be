import { Request, Response } from "express";
import { PatientClass } from "../entity/patient_class.entity";
import {
    createPatientClass,
    deletePatientClass,
    getPatientClassById,
    getPatientClassByKey,
    updatePatientClass,
} from "../service/patient_class.service";

export const addPatientClass = async (req: Request, res: Response) => {
    try {
        const reqBody = req.body;
        const pClassFound = await getPatientClassByKey("code", reqBody.code);

        if (pClassFound) {
            return res.status(403).send({
                status: "Bad Request",
                message: "Patient class code exist.",
            });
        }

        await createPatientClass(reqBody);

        return res.send({
            status: "Success",
            message: "Patient Class Register Successful",
        });
    } catch (error) {
        return res.status(500).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};

export const updateClass = async (req: Request, res: Response) => {
    try {
        const { pClassId } = req.params;
        const reqBody = req.body;

        const pClassFound = await getPatientClassById(parseInt(pClassId));

        if (!pClassFound) {
            return res.status(404).send({
                status: "Not Found",
                message: "Patient Class does not exist.",
            });
        }

        const updatedClass = await updatePatientClass(pClassFound, reqBody);

        return res.send({
            status: "Success",
            message: "Patient Class Update Successful",
            data: updatedClass,
        });
    } catch (error) {
        return res.status(500).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};

export const removeClass = async (req: Request, res: Response) => {
    try {
        const { pClassId } = req.params;
        const pClassFound = await getPatientClassById(parseInt(pClassId));

        if (!pClassFound) {
            return res.status(404).send({
                status: "Not Found",
                message: "Patient Class does not exist.",
            });
        }

        await deletePatientClass(pClassFound);

        return res.send({
            status: "Success",
            message: "Patient Class Remove Successful",
        });
    } catch (error) {
        return res.status(500).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};

export const getOneClass = async (req: Request, res: Response) => {
    try {
        const { pClassId } = req.params;
        const pClassFound = await getPatientClassById(parseInt(pClassId));

        if (!pClassFound) {
            return res.status(404).send({
                status: "Not Found",
                message: "Patient Class does not exist.",
            });
        }

        return res.send(pClassFound);
    } catch (error) {
        return res.status(500).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};

export const viewAllClass = async (req: Request, res: Response) => {
    try {
        const [allClass, count] = await PatientClass.findAndCount();

        return res.send({
            data: allClass,
            count: count,
        });
    } catch (error) {
        return res.status(500).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};
