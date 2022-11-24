import { Request, Response } from "express";
import { Clinic } from "../entity/clinic_branch.entity";
import {
    createClinic,
    deleteClinic,
    getClinicById,
    getClinicByKey,
    updateClinic,
} from "../service/clinic_branch.service";

export const insertClinic = async (req: Request, res: Response) => {
    try {
        const reqBody = req.body;
        const clinicFound = await getClinicByKey(
            "hosp_code",
            reqBody.hosp_code,
        );

        if (clinicFound) {
            return res.status(403).send({
                status: "Bad Request",
                message: "Clinic branch exist.",
            });
        }

        await createClinic(reqBody);

        return res.send({
            status: "Success",
            message: "Clinic Register Successful",
        });
    } catch (error) {
        return res.status(500).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};

export const upsertClinic = async (req: Request, res: Response) => {
    try {
        const { clinicId } = req.params;
        const reqBody = req.body;

        const clinicFound = await getClinicById(parseInt(clinicId));

        if (!clinicFound) {
            return res.status(404).send({
                status: "Not Found",
                message: "Clinic does not exist.",
            });
        }

        const updatedClinic = await updateClinic(clinicFound, reqBody);

        return res.send({
            status: "Success",
            message: "Clinic Update Successful",
            data: updatedClinic,
        });
    } catch (error) {
        return res.status(500).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};

export const getOneClinic = async (req: Request, res: Response) => {
    try {
        const { clinicId } = req.params;
        const clinicFound = await getClinicById(parseInt(clinicId));

        if (!clinicFound) {
            return res.status(403).send({
                status: "Not Found",
                message: "Clinic does not exist.",
            });
        }

        return res.send(clinicFound);
    } catch (error) {
        return res.status(500).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};

export const viewAllClinic = async (req: Request, res: Response) => {
    try {
        const [allClinic, count] = await Clinic.findAndCount();

        return res.send({
            data: allClinic,
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

export const removeClinic = async (req: Request, res: Response) => {
    try {
        const { clinicId } = req.params;
        const clinicFound = await getClinicById(parseInt(clinicId));

        if (!clinicFound) {
            return res.status(403).send({
                status: "Not Found",
                message: "Clinic does not exist.",
            });
        }

        await deleteClinic(clinicFound);

        return res.send({
            status: "Success",
            message: "Clinic Remove Successful",
        });
    } catch (error) {
        return res.status(500).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};
