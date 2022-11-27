import { Request, Response } from "express";
import { Packcage } from "../entity/packages.entity";
import {
    addRelateService,
    createPackage,
    deletePackage,
    getPackageById,
    getPackageByKey,
    updatePackage,
} from "../service/packages.service";
import { getServiceById } from "../service/services.service";

export const insertPckg = async (req: Request, res: Response) => {
    try {
        const reqBody = req.body;
        const pckgFound = await getPackageByKey("code", reqBody.code);

        if (pckgFound) {
            return res.status(403).send({
                status: "Bad Request",
                message: "Package code exist.",
            });
        }

        if (reqBody.services === undefined) {
            return res.status(403).send({
                status: "Bad Request",
                message: "Service(s) is/are required.",
            });
        }

        const createdPckg = await createPackage(reqBody);
        const services = reqBody.services; // array of service id

        for (let i = 0; i < services.length; i++) {
            const srvcId = services[i];
            const srvcFound = await getServiceById(parseInt(srvcId));
            if (!srvcFound) {
                return res.status(404).send({
                    status: "Bad Request",
                    message: "Service does not exist.",
                });
            }
            await addRelateService(createdPckg.id, srvcFound.id);
        }

        return res.send({
            status: "Success",
            message: "Package Register Successful",
        });
    } catch (error) {
        return res.status(500).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};

export const upsertPckg = async (req: Request, res: Response) => {
    try {
        const { pckgId } = req.params;
        const reqBody = req.body;

        const pckgFound = await getPackageById(parseInt(pckgId), ["service"]);

        if (!pckgFound) {
            return res.status(404).send({
                status: "Bad Request",
                message: "Package does not exist.",
            });
        }
        const serviceArrId = reqBody.services;
        let services: any = [];
        for (let i = 0; i < serviceArrId.length; i++) {
            const srvcId = serviceArrId[i];
            const srvcFound = await getServiceById(parseInt(srvcId));
            services.push(srvcFound);
        }

        reqBody.services = services;
        const updatedPckg = await updatePackage(pckgFound, reqBody);

        return res.send({
            status: "Success",
            message: "Service Update Successful",
            data: updatedPckg,
        });
    } catch (error) {
        return res.status(500).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};

export const removePckg = async (req: Request, res: Response) => {
    try {
        const { pckgId } = req.params;

        const pckgFound = await getPackageById(parseInt(pckgId));

        if (!pckgFound) {
            return res.status(404).send({
                status: "Bad Request",
                message: "Package does not exist.",
            });
        }

        await deletePackage(pckgFound);

        return res.send({
            status: "Success",
            message: "Package Remove Successful",
        });
    } catch (error) {
        return res.status(500).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};

export const getOnePckg = async (req: Request, res: Response) => {
    try {
        const { pckgId } = req.params;

        const pckgFound = await getPackageById(parseInt(pckgId), ["service"]);

        if (!pckgFound) {
            return res.status(404).send({
                status: "Bad Request",
                message: "Package does not exist.",
            });
        }

        return res.send(pckgFound);
    } catch (error) {
        return res.status(500).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};

export const viewAllPckg = async (req: Request, res: Response) => {
    try {
        const [allPckg, count] = await Packcage.findAndCount({
            relations: ["service"],
        });

        return res.send({
            data: allPckg,
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
