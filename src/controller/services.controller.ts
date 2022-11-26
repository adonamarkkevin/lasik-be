import { Request, Response } from "express";
import { Service } from "../entity/services.entity";
import {
    createService,
    deleteService,
    getServiceById,
    getServiceByKey,
    relateToBranch,
    updateService,
} from "../service/services.service";

export const insertSrvc = async (req: Request, res: Response) => {
    try {
        const reqBody = req.body;
        const srvcFound = await getServiceByKey("code", reqBody.code);

        if (srvcFound) {
            return res.status(403).send({
                status: "Bad Request",
                message: "Service code exist.",
            });
        }

        if (reqBody.deptId == undefined || null || "") {
            return res.status(403).send({
                status: "Bad Request",
                message: "Department ID is required",
            });
        }

        const createdSrvc = await createService(reqBody);
        await relateToBranch(createdSrvc.id, reqBody.deptId);

        return res.send({
            status: "Success",
            message: "Service Register Successful",
        });
    } catch (error) {
        return res.status(500).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};

export const updateSrvc = async (req: Request, res: Response) => {
    try {
        const { srvcId } = req.params;
        const reqBody = req.body;

        const srvcFound = await getServiceById(parseInt(srvcId));

        if (!srvcFound) {
            return res.status(404).send({
                status: "Not Found",
                message: "Service does not exist.",
            });
        }

        const updateSrvc = await updateService(srvcFound, reqBody);

        return res.send({
            status: "Success",
            message: "Service Update Successful",
            data: updateSrvc,
        });
    } catch (error) {
        return res.status(500).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};

export const removeSrvc = async (req: Request, res: Response) => {
    try {
        const { srvcId } = req.params;

        const srvcFound = await getServiceById(parseInt(srvcId));

        if (!srvcFound) {
            return res.status(404).send({
                status: "Not Found",
                message: "Service does not exist.",
            });
        }

        await deleteService(srvcFound);

        return res.send({
            status: "Success",
            message: "Service Remove Successful",
        });
    } catch (error) {
        return res.status(500).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};

export const getOneSrvc = async (req: Request, res: Response) => {
    try {
        const { srvcId } = req.params;

        const srvcFound = await getServiceById(parseInt(srvcId));

        if (!srvcFound) {
            return res.status(404).send({
                status: "Not Found",
                message: "Service does not exist.",
            });
        }

        return res.send(srvcFound);
    } catch (error) {
        return res.status(500).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};

export const viewAllSrvc = async (req: Request, res: Response) => {
    try {
        const [allSrvc, count] = await Service.findAndCount();

        return res.send({
            data: allSrvc,
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
