import { TransactionInfo } from "../entity/transaction_info.entity";
import { refCodeDate } from "./datetime_formatter.helper";

export const transRefCode = async (branch: string) => {
    let transCount = await TransactionInfo.count();
    let date = refCodeDate();

    let refCode = `${branch}${date}${String(transCount).padStart(2, "0")}`;
    return refCode;
};
