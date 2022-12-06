import { Request, Response } from "express";
import { Like } from "typeorm";
import { Queue } from "../entity/queue.entity";
import { QueueInternal } from "../entity/queue_internal.entity";
import { assignDoctor } from "../service/transaction_services.service";

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
            order: {
                created_at: "DESC",
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

export const viewAllInternalQ = async (req: Request, res: Response) => {
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

        let [allQ, count] = await QueueInternal.findAndCount({
            where: {
                queue_number: Like(`%${clinic.hosp_code}%`),
            },

            order: {
                created_at: "DESC",
            },
            relations: [
                "transaction_service",
                "transaction_service.assigned_doctor",
                "patient",
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

export const clearAllInternalQ = async (req: Request, res: Response) => {
    try {
        await QueueInternal.clear();

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

export const assignDoctorOnQ = async (req: Request, res: Response) => {
    try {
        const { queue_id } = req.params;
        const userFound = req.user;
        const department = userFound.department;
        const queueFound = await QueueInternal.findOne({
            where: {
                id: parseInt(queue_id),
            },
            relations: ["transaction_service"],
        });

        if (department.id !== 12) {
            return res.status(403).send({
                status: "Bad Request",
                message: "Doctor's module: You aren't signed in as a Doctor",
            });
        }

        if (!queueFound) {
            return res.status(404).send({
                status: "Not Found",
                message: "Queue does not exist",
            });
        }

        const serviceId = queueFound.transaction_service.id;
        await assignDoctor(serviceId, userFound.id);
        queueFound.queue_status = "ON PROCESS";
        await QueueInternal.save(queueFound);
        return res.send({
            status: "Success",
            message: `Service was successfully assigned to Dr. ${userFound.firstName}`,
        });
    } catch (error) {
        return res.status(401).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};

export const updateQueueStatus = async (req: Request, res: Response) => {
    try {
        const { queue_id } = req.params;
        const { status } = req.body;
        const queueFound = await Queue.findOne({
            where: { id: parseInt(queue_id) },
        });
        if (!queueFound) {
            return res.status(404).send({
                status: "Not Found",
                message: "Queue not found",
            });
        }
        queueFound.queue_status = status;
        await Queue.save(queueFound);
        return res.send({
            status: "Success",
            message: "Queue Status Update Successfull",
        });
    } catch (error) {
        return res.status(401).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};

export const updateInternalQ = async (req: Request, res: Response) => {
    try {
        const { queue_id } = req.params;
        const { status } = req.body;
        const queueFound = await QueueInternal.findOne({
            where: { id: parseInt(queue_id) },
        });
        if (!queueFound) {
            return res.status(404).send({
                status: "Not Found",
                message: "Queue not found",
            });
        }
        queueFound.queue_status = status;
        await QueueInternal.save(queueFound);
        return res.send({
            status: "Success",
            message: "Queue Status Update Successfull",
        });
    } catch (error) {
        return res.status(401).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};
