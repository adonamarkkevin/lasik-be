import { Request, Response } from "express";
import { Department } from "../entity/department.entity";
import {
    createDep,
    deleteDep,
    getDepById,
    getDepByKey,
    updateDep,
} from "../service/department.service";

export const insertDept = async (req: Request, res: Response) => {
    try {
        const reqBody = req.body;
        const deptFound = await getDepByKey("code", reqBody.code);

        if (deptFound) {
            return res.status(403).send({
                status: "Bad Request",
                message: "Department exist.",
            });
        }

        await createDep(reqBody);

        return res.send({
            status: "Success",
            message: "Department Register Successful",
        });
    } catch (error) {
        return res.status(500).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};

export const upsertDept = async (req: Request, res: Response) => {
    try {
        const { deparmentId } = req.params;
        const reqBody = req.body;

        const deptFound = await getDepById(parseInt(deparmentId));

        if (!deptFound) {
            return res.status(404).send({
                status: "Not Found",
                message: "Deparment does not exist.",
            });
        }

        const updatedDept = await updateDep(deptFound, reqBody);

        return res.send({
            status: "Success",
            message: "Department Update Successful",
            data: updatedDept,
        });
    } catch (error) {
        return res.status(500).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};

export const getOneDept = async (req: Request, res: Response) => {
    try {
        const { deparmentId } = req.params;
        const deptFound = await getDepById(parseInt(deparmentId));

        if (!deptFound) {
            return res.status(403).send({
                status: "Not Found",
                message: "Clinic does not exist.",
            });
        }
        return res.send(deptFound);
    } catch (error) {
        return res.status(500).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};

export const removeDept = async (req: Request, res: Response) => {
    try {
        const { deparmentId } = req.params;
        const deptFound = await getDepById(parseInt(deparmentId));

        if (!deptFound) {
            return res.status(403).send({
                status: "Not Found",
                message: "Clinic does not exist.",
            });
        }

        await deleteDep(deptFound);

        return res.send({
            status: "Success",
            message: "Department Remove Successful",
        });
    } catch (error) {
        return res.status(500).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};

export const viewAllDept = async (req: Request, res: Response) => {
    try {
        const [allDept, count] = await Department.find();

        return res.send({
            data: allDept,
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
