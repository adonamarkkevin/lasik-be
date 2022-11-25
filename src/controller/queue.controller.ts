import { Request, Response } from "express";
import { Queue } from "../entity/queue.entity";

export const viewAllQueue = async (req: Request, res: Response) => {
    try {
        const userFound = req.user;
        const clinic = userFound.clinic;
        if (!clinic) {
            return res.status(401).send({
                status: "Unauthorized",
                message:
                    "Permission denied. Either you don't have access to this resources or you are log in as super admin",
            });
        }

        let [allQ, count] = await Queue.findAndCount({
            where: {
                transaction_info: {
                    clinic: {
                        id: parseInt(clinic.id),
                    },
                },
            },
            relations: [
                "transaction_info",
                "transaction_info.transaction_package",
                "transaction_info.transaction_service",
                "transaction_info.transaction_package.transaction_service",
            ],
        });

        return res.send({
            data: allQ,
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

export const clearQueue = async (req: Request, res: Response) => {
    try {
        await Queue.clear();

        return res.send({
            status: "Success",
            message: "Queue Cleared",
        });
    } catch (error) {
        return res.status(401).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};
