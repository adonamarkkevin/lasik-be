import { Request, Response } from "express";
import { Queue } from "../entity/queue.entity";
import { TransactionInfo } from "../entity/transaction_info.entity";
import { queueNumber, transRefCode } from "../helper/ref_number.help";
import { getPackageById } from "../service/packages.service";
import { getServiceById } from "../service/services.service";
import {
    addBranchTransaction,
    addPackageTransaction,
    addServiceTransaction,
    createTransaction,
    deleteTransaction,
    getTransactionById,
    updateTransaction,
} from "../service/transaction_info.service";
import {
    createTransactionPackage,
    getTransactionPackageById,
    updateTransactionPackage,
} from "../service/transaction_packages.service";
import {
    createTransactionService,
    getTransactionServiceById,
    updateTransactionService,
} from "../service/transaction_services.service";

export const insertTransaction = async (req: Request, res: Response) => {
    try {
        const userFound = req.user;
        const userBranch = userFound.clinic;
        const refCode = await transRefCode(userBranch.hosp_code);
        let reqBody = req.body;
        reqBody.referrence_num = refCode;

        const transaction = await createTransaction(reqBody);
        await addBranchTransaction(transaction.id, userBranch.id);

        const packageIdArr = reqBody.package;
        const serviceIdArr = reqBody.service;

        if (packageIdArr !== undefined || null || "") {
            for (let i = 0; i < packageIdArr.length; i++) {
                const pckgId = packageIdArr[i];
                const pckgRelation = ["service"];
                const pckgFound = await getPackageById(
                    parseInt(pckgId),
                    pckgRelation,
                );
                const transPckg = await createTransactionPackage(pckgFound);
                await addPackageTransaction(transaction, transPckg);
            }
        }

        if (serviceIdArr !== undefined || null || "") {
            for (let i = 0; i < serviceIdArr.length; i++) {
                const srvcId = serviceIdArr[i];
                const srvcFound = await getServiceById(parseInt(srvcId));
                const transSrvc = await createTransactionService(srvcFound);
                await addServiceTransaction(transaction, transSrvc);
            }
        }

        return res.send({
            status: "Success",
            message: "Transaction Register Successful",
        });
    } catch (error) {
        return res.status(500).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};

export const viewTransPkcg = async (req: Request, res: Response) => {
    try {
        const { pckgId } = req.params;
        const pckgRelation = ["service"];
        const pckgFound = await getTransactionPackageById(
            parseInt(pckgId),
            pckgRelation,
        );

        if (!pckgFound) {
            return res.status(404).send({
                status: "Not Found",
                message: "Transaction package does not exist.",
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

export const updateTransPckg = async (req: Request, res: Response) => {
    try {
        const { pckgId } = req.params;
        const reqBody = req.body;
        const pckgRelation = ["service"];
        const pckgFound = await getTransactionPackageById(
            parseInt(pckgId),
            pckgRelation,
        );

        if (!pckgFound) {
            return res.status(404).send({
                status: "Not Found",
                message: "Transaction package does not exist.",
            });
        }

        const updatedPckg = await updateTransactionPackage(pckgFound, reqBody);

        return res.send({
            status: "Success",
            message: "Transaction Package Update Successful",
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

export const viewTransSvc = async (req: Request, res: Response) => {
    try {
        const { srvcId } = req.params;
        const srvcFound = await getTransactionServiceById(parseInt(srvcId));

        if (!srvcFound) {
            return res.status(404).send({
                status: "Not Found",
                message: "Transaction package does not exist.",
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

export const updateTransSrvc = async (req: Request, res: Response) => {
    try {
        const { srvcId } = req.params;
        const reqBody = req.body;
        const srvcFound = await getTransactionServiceById(parseInt(srvcId));

        if (!srvcFound) {
            return res.status(404).send({
                status: "Not Found",
                message: "Transaction package does not exist.",
            });
        }

        const updatedTransSrvc = await updateTransactionService(
            srvcFound,
            reqBody,
        );

        return res.send({
            status: "Success",
            message: "Transaction Service Update Successful",
            data: updatedTransSrvc,
        });
    } catch (error) {
        return res.status(500).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};

export const removeTrans = async (req: Request, res: Response) => {
    try {
        const { transId } = req.params;
        const transRelation = ["transaction_package", "transaction_service"];
        const transFound = await getTransactionById(
            parseInt(transId),
            transRelation,
        );

        if (!transFound) {
            return res.status(404).send({
                status: "Not Found",
                message: "Transaction package does not exist.",
            });
        }

        await deleteTransaction(transFound);

        return res.send({
            status: "Success",
            message: "Transaction Remove Successful",
        });
    } catch (error) {
        return res.status(500).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};

export const viewAllTransaction = async (req: Request, res: Response) => {
    try {
        const userFound = req.user;
        const clinic = userFound.clinic;
        const [allTrans, count] = await TransactionInfo.findAndCount({
            where: {
                clinic: {
                    id: clinic.id,
                },
            },
            relations: [
                "third_party_provider",
                "patient",
                "transaction_package",
                "transaction_package.transaction_service",
                "transaction_service",
                "clinic",
            ],
        });

        return res.send({
            data: allTrans,
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

export const processTrans = async (req: Request, res: Response) => {
    try {
        const { transId } = req.params;
        const reqBody = req.body;
        const userFound = req.user;
        const clinic = userFound.clinic;
        const transFound = await getTransactionById(parseInt(transId));

        if (!transFound) {
            return res.status(404).send({
                status: "Not Found",
                message: "Transaction does not exist.",
            });
        }

        const updatedTrans = await updateTransaction(transFound, reqBody);
        let qNum = await queueNumber(clinic.hosp_code);
        await Queue.create({
            queue_number: qNum,
        }).save();

        return res.send({
            status: "Success",
            message: "Transaction Process Successful",
            data: updatedTrans,
        });
    } catch (error) {
        return res.status(500).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};
