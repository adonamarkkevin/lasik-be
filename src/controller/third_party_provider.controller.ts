import { Request, Response } from "express";
import { ThirdParty } from "../entity/third_party_provider.entity";
import {
    createTpp,
    deleteTpp,
    getTppById,
    getTppByKey,
    updateTpp,
} from "../service/third_party_provider.service";

export const insertTpp = async (req: Request, res: Response) => {
    try {
        const reqBody = req.body;
        const tppFound = await getTppByKey(
            "third_party_code",
            reqBody.third_party_code,
        );

        if (tppFound) {
            return res.status(403).send({
                status: "Bad Request",
                message: "Third party code exist.",
            });
        }

        await createTpp(reqBody);

        return res.send({
            status: "Success",
            message: "Third Party Provider Register Successful",
        });
    } catch (error) {
        return res.status(500).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};

export const upsertTpp = async (req: Request, res: Response) => {
    try {
        const { tppId } = req.params;
        const reqBody = req.body;

        const tppFound = await getTppById(parseInt(tppId));

        if (!tppFound) {
            return res.status(404).send({
                status: "Not Found",
                message: "Third Party Provider does not exist.",
            });
        }

        const updatedTpp = await updateTpp(tppFound, reqBody);

        return res.send({
            status: "Success",
            message: "Third Party Provider Update Successful",
            data: updatedTpp,
        });
    } catch (error) {
        return res.status(500).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};

export const removeTpp = async (req: Request, res: Response) => {
    try {
        const { tppId } = req.params;
        const tppFound = await getTppById(parseInt(tppId));

        if (!tppFound) {
            return res.status(404).send({
                status: "Not Found",
                message: "Third Party Provider does not exist.",
            });
        }

        await deleteTpp(tppFound);

        return res.send({
            status: "Success",
            message: "Third Party Provider Remove Successful",
        });
    } catch (error) {
        return res.status(500).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};

export const getOneTpp = async (req: Request, res: Response) => {
    try {
        const { tppId } = req.params;
        const tppFound = await getTppById(parseInt(tppId));

        if (!tppFound) {
            return res.status(404).send({
                status: "Not Found",
                message: "Third Party Provider does not exist.",
            });
        }

        return res.send(tppFound);
    } catch (error) {
        return res.status(500).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};

export const viewAllTpp = async (req: Request, res: Response) => {
    try {
        const [allTpp, count] = await ThirdParty.findAndCount();

        return res.send({
            data: allTpp,
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
