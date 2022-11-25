import { Request, Response } from "express";
import { UserInfo } from "../entity/user_info.entity";
import {
    assignDept,
    createUser,
    deleteUser,
    getUserById,
    getUserByKey,
    updateUser,
} from "../service/user_info.service";

export const addPatient = async (req: Request, res: Response) => {
    try {
        const reqBody = req.body;
        const patientFound = await getUserByKey("email", reqBody.email);
        if (patientFound) {
            return res.status(403).send({
                status: "Bad Request",
                message: "Email exist.",
            });
        }
        const createdUser = await createUser(reqBody);
        await assignDept(createdUser.id, 2);

        return res.send({
            status: "Success",
            message: "Patient Register Successful",
        });
    } catch (error) {
        return res.status(401).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};

export const updatePatient = async (req: Request, res: Response) => {
    try {
        const { patientId } = req.params;
        const reqBody = req.body;
        const patientFound = await getUserById(parseInt(patientId));
        if (!patientFound) {
            return res.status(404).send({
                status: "Not Found",
                message: "Patient does not exist.",
            });
        }

        const updatedpatient = await updateUser(patientFound, reqBody);

        return res.send({
            status: "Success",
            message: "Patient Update Successful",
            data: updatedpatient,
        });
    } catch (error) {
        return res.status(401).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};

export const removePatient = async (req: Request, res: Response) => {
    try {
        const { patientId } = req.params;

        const patientFound = await getUserById(parseInt(patientId));
        if (!patientFound) {
            return res.status(404).send({
                status: "Not Found",
                message: "Patient does not exist.",
            });
        }

        await deleteUser(patientFound);

        return res.send({
            status: "Success",
            message: "Patient Remove Successful",
        });
    } catch (error) {
        return res.status(401).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};

export const getOnePatient = async (req: Request, res: Response) => {
    try {
        const { patientId } = req.params;

        const patientFound = await getUserById(parseInt(patientId));
        if (!patientFound) {
            return res.status(404).send({
                status: "Not Found",
                message: "Patient does not exist.",
            });
        }
        return res.send(patientFound);
    } catch (error) {
        return res.status(401).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};

export const viewAllPatient = async (req: Request, res: Response) => {
    try {
        const [allPatient, count] = await UserInfo.findAndCount({
            where: {
                department: {
                    id: 2,
                },
            },
        });

        return res.send({
            data: allPatient,
            count: count,
        });
    } catch (error) {
        return res.status(401).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};
