import { Request, Response } from "express";
import { Between, In, IsNull, Not } from "typeorm";
import { Queue } from "../entity/queue.entity";
import { QueueInternal } from "../entity/queue_internal.entity";
import { TransactionInfo } from "../entity/transaction_info.entity";
import {
    invoiceNumber,
    queueNumber,
    srvcQueueNumber,
    transRefCode,
} from "../helper/ref_number.help";
import { getPackageById } from "../service/packages.service";
import { getServiceById } from "../service/services.service";
import {
    addBranchTransaction,
    addPackageTransaction,
    addPatientTransaction,
    addPatietClassTransaction,
    addQueueTransaction,
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
    addServiceQueue,
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

        if (reqBody.patientId === undefined) {
            return res.status(403).send({
                status: "Bad Request",
                message: "Patient ID is required",
            });
        }

        if (reqBody.pClassId === undefined) {
            return res.status(403).send({
                status: "Bad Request",
                message: "Patient Class ID is required",
            });
        }

        const transaction = await createTransaction(reqBody);
        await addBranchTransaction(transaction.id, userBranch.id);
        await addPatientTransaction(transaction.id, reqBody.patientId);
        await addPatietClassTransaction(transaction.id, reqBody.pClassId);

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

                pckgFound.service.map((d) => delete d.id);
                const transPckg = await createTransactionPackage(pckgFound);
                await addPackageTransaction(transaction, transPckg);
            }
        }

        if (serviceIdArr !== undefined || null || "") {
            for (let i = 0; i < serviceIdArr.length; i++) {
                const srvcId = serviceIdArr[i];
                const srvcFound = await getServiceById(parseInt(srvcId));
                delete srvcFound.id;
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
        const pckgRelation = ["transaction_service"];
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
        const pckgRelation = ["transaction_service"];
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

        if (reqBody.service !== undefined) {
            return res.status(403).send({
                status: "Bad Request",
                message:
                    "Transaction Service cannot be updated unde transaction Package.",
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
                message: "Transaction service does not exist.",
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
                message: "Transaction does not exist.",
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
        const { transaction_type } = req.params;
        const clinic = userFound.clinic;
        const department = userFound.department;

        const transClass = {
            billing: [5],
            invoice: [1, 2, 3, 4, 6],
            visit: [],
        };

        const transWhere = transClass[transaction_type];

        const [allTrans, count] =
            department.id !== 1
                ? transaction_type == "visit"
                    ? await TransactionInfo.findAndCount({
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
                              "transaction_package.transaction_service.assigned_doctor",
                              "transaction_service",
                              "transaction_service.assigned_doctor",
                              "clinic",
                              "patient_class",
                          ],
                          order: { created_at: "DESC" },
                      })
                    : await TransactionInfo.findAndCount({
                          where: {
                              clinic: {
                                  id: clinic.id,
                              },
                              patient_class: {
                                  id: In(transWhere),
                              },
                          },
                          relations: [
                              "third_party_provider",
                              "patient",
                              "transaction_package",
                              "transaction_package.transaction_service",
                              "transaction_package.transaction_service.assigned_doctor",
                              "transaction_service",
                              "transaction_service.assigned_doctor",
                              "clinic",
                              "patient_class",
                          ],
                          order: { created_at: "DESC" },
                      })
                : transaction_type == "visit"
                ? await TransactionInfo.findAndCount({
                      relations: [
                          "third_party_provider",
                          "patient",
                          "transaction_package",
                          "transaction_package.transaction_service",
                          "transaction_package.transaction_service.assigned_doctor",
                          "transaction_service",
                          "transaction_service.assigned_doctor",
                          "clinic",
                          "patient_class",
                      ],
                      order: { created_at: "DESC" },
                  })
                : await TransactionInfo.findAndCount({
                      where: {
                          patient_class: {
                              id: In(transWhere),
                          },
                      },
                      relations: [
                          "third_party_provider",
                          "patient",
                          "transaction_package",
                          "transaction_package.transaction_service",
                          "transaction_package.transaction_service.assigned_doctor",
                          "transaction_service",
                          "transaction_service.assigned_doctor",
                          "clinic",
                          "patient_class",
                      ],
                      order: { created_at: "DESC" },
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
        const transFound = await getTransactionById(parseInt(transId), [
            "patient_class",
            "patient",
        ]);
        const patientFound = transFound.patient;
        const queueFound = await Queue.findOne({
            where: {
                transaction_info: {
                    id: transFound.id,
                },
            },
        });

        if (!transFound) {
            return res.status(404).send({
                status: "Not Found",
                message: "Transaction does not exist.",
            });
        }

        if (queueFound) {
            return res.status(403).send({
                status: "Bad Request",
                message: "Transaction is already on queue.",
            });
        }

        let billing = [4, 5];

        reqBody.transaction_type =
            billing.indexOf(transFound.patient_class.id) > -1
                ? "billing"
                : "sales invoice";
        reqBody.invoice_number = await invoiceNumber(clinic.id);

        const updatedTrans = await updateTransaction(transFound, reqBody);
        let qNum = await queueNumber(clinic.hosp_code);
        let internalQnum = await srvcQueueNumber(clinic.hosp_code);
        let q = await Queue.create({
            queue_number: qNum,
        }).save();

        await addQueueTransaction(updatedTrans.id, q.id);

        const packageArr = transFound.transaction_package;
        const serviceArr = transFound.transaction_service;
        if (packageArr !== null) {
            for (let i = 0; i < packageArr.length; i++) {
                const packageObj = packageArr[i];
                const packageSrvc = packageObj.transaction_service;
                for (let i = 0; i < packageSrvc.length; i++) {
                    const service = packageSrvc[i];
                    let internalQ = await QueueInternal.create({
                        queue_number: internalQnum,
                    }).save();
                    await QueueInternal.createQueryBuilder()
                        .relation("transaction_service")
                        .of(internalQ.id)
                        .set(service.id);
                    await QueueInternal.createQueryBuilder()
                        .relation("patient")
                        .of(internalQ.id)
                        .set(patientFound.id);
                }
            }
        }
        if (serviceArr !== null) {
            for (let i = 0; i < serviceArr.length; i++) {
                const serviceObj = serviceArr[i];
                let internalQ = await QueueInternal.create({
                    queue_number: internalQnum,
                }).save();
                await QueueInternal.createQueryBuilder()
                    .relation("transaction_service")
                    .of(internalQ.id)
                    .set(serviceObj.id);
                await QueueInternal.createQueryBuilder()
                    .relation("patient")
                    .of(internalQ.id)
                    .set(patientFound.id);
            }
        }

        return res.send({
            status: "Success",
            message: "Transaction Process Successful",
            data: updatedTrans,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};

export const viewBillSummaryPerDate = async (req: Request, res: Response) => {
    try {
        const { date_from, date_to } = req.body;
        const userFound = req.user;
        const clinic = userFound.clinic;
        const department = userFound.department;
        const dateAfter = new Date(date_to).getDate() + 2;

        console.log(dateAfter);
        const dateFrom = new Date(date_from);
        const dateTo = new Date(date_to);

        const [allBilling, count] =
            department.id === 1
                ? await TransactionInfo.findAndCount({
                      where: {
                          transaction_type: "billing",
                          created_at: Between(
                              dateFrom,
                              new Date(dateTo.getTime() + 86400000), // +1 day since date start at 12am
                          ),
                      },
                      relations: [
                          "patient",
                          "transaction_package",
                          "transaction_package.transaction_service",
                          "transaction_package.transaction_service.assigned_doctor",
                          "transaction_service",
                          "transaction_service.assigned_doctor",
                          "clinic",
                          "patient_class",
                      ],
                      order: { created_at: "DESC" },
                  })
                : await TransactionInfo.findAndCount({
                      where: {
                          clinic: {
                              id: clinic.id,
                          },
                          transaction_type: "billing",
                          created_at: Between(
                              dateFrom,
                              new Date(dateTo.getTime() + 86400000), // +1 day since date start at 12am
                          ),
                      },
                      relations: [
                          "patient",
                          "transaction_package",
                          "transaction_package.transaction_service",
                          "transaction_package.transaction_service.assigned_doctor",
                          "transaction_service",
                          "transaction_service.assigned_doctor",
                          "clinic",
                          "patient_class",
                      ],
                      order: { created_at: "DESC" },
                  });

        return res.send({
            data: allBilling,
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

export const viewInvoiceSummaryPerDate = async (
    req: Request,
    res: Response,
) => {
    try {
        const { date_from, date_to } = req.body;
        const userFound = req.user;
        const clinic = userFound.clinic;
        const department = userFound.department;
        const dateTo = new Date(date_to);
        const dateFrom = new Date(date_from);

        const [allInvoice, count] =
            department.id === 1
                ? await TransactionInfo.findAndCount({
                      where: {
                          transaction_type: Not("billing"),
                          created_at: Between(
                              dateFrom,
                              new Date(dateTo.getTime() + 86400000), // +1 day since date start at 12am
                          ),
                      },
                      relations: [
                          "patient",
                          "transaction_package",
                          "transaction_package.transaction_service",
                          "transaction_package.transaction_service.assigned_doctor",
                          "transaction_service",
                          "transaction_service.assigned_doctor",
                          "clinic",
                          "patient_class",
                      ],
                      order: { created_at: "DESC" },
                  })
                : await TransactionInfo.findAndCount({
                      where: {
                          clinic: {
                              id: clinic.id,
                          },
                          transaction_type: Not("billing"),
                          created_at: Between(
                              dateFrom,
                              new Date(dateTo.getTime() + 86400000), // +1 day since date start at 12am
                          ),
                      },
                      relations: [
                          "patient",
                          "transaction_package",
                          "transaction_package.transaction_service",
                          "transaction_package.transaction_service.assigned_doctor",
                          "transaction_service",
                          "transaction_service.assigned_doctor",
                          "clinic",
                          "patient_class",
                      ],
                      order: { created_at: "DESC" },
                  });

        return res.send({
            data: allInvoice,
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

export const viewAllVoid = async (req: Request, res: Response) => {
    try {
        const userFound = req.user;
        const clinic = userFound.clinic;
        const { transaction_type } = req.params;
        const transClass = {
            billing: [5],
            invoice: [1, 2, 3, 4, 6],
        };

        const transWhere = transClass[transaction_type];

        const [allVoid, count] =
            clinic.id === 1
                ? await TransactionInfo.findAndCount({
                      where: { deleted_at: Not(IsNull()) },
                      withDeleted: true,
                  })
                : await TransactionInfo.find({
                      where: {
                          deleted_at: Not(IsNull()),
                          clinic: {
                              id: clinic.id,
                          },
                          patient_class: {
                              id: In(transWhere),
                          },
                      },
                      withDeleted: true,
                  });
        return res.send({
            data: allVoid,
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
