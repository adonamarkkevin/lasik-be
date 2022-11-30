import { Request, Response } from "express";
import { Between } from "typeorm";
import { TransactionService } from "../entity/transaction_services.entity";

export const getAllAssignedServices = async (req: Request, res: Response) => {
    try {
        const userFound = req.user;
        const { date_from, date_to } = req.body;
        const dateFrom = new Date(date_from);
        const dateTo = new Date(date_to);
        const [allAssignedSrvc, count] = await TransactionService.findAndCount({
            where: {
                assigned_doctor: {
                    id: userFound.id,
                },
                created_at: Between(
                    dateFrom,
                    new Date(dateTo.getTime() + 86400000),
                ),
            },
        });
        return res.send({
            data: allAssignedSrvc,
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
