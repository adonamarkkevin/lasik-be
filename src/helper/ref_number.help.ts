import { Queue } from "../entity/queue.entity";
import { QueueInternal } from "../entity/queue_internal.entity";
import { TransactionInfo } from "../entity/transaction_info.entity";
import { refCodeDate } from "./datetime_formatter.helper";

export const transRefCode = async (branch: string) => {
    let transCount = await TransactionInfo.count();
    let date = refCodeDate();

    let refCode = `${branch}${date}${String(transCount + 1).padStart(2, "0")}`;
    return refCode;
};

export const queueNumber = async (branch: string) => {
    let queueCount = await Queue.count();
    let queue = `${branch}-${String(queueCount + 1).padStart(3, "0")}`;
    return queue;
};

export const srvcQueueNumber = async (branch: string) => {
    let queueCount = await QueueInternal.count();
    let queue = `${branch}-${String(queueCount + 1).padStart(3, "0")}`;
    return queue;
};

export const invoiceNumber = async (branchId: number) => {
    let invoiceCount = await TransactionInfo.count({
        where: {
            clinic: {
                id: branchId,
            },
        },
    });

    let invoiceNumber = `${String(branchId).padStart(
        2,
        "0",
    )}${refCodeDate()}${String(invoiceCount + 1).padStart(2, "0")}`;

    return invoiceNumber;
};
