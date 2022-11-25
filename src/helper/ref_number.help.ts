import { Queue } from "../entity/queue.entity";
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
