import { TransactionInfo } from "../entity/transaction_info.entity";

export const createTransaction = async (transaction: any) => {
    const newTransaction = new TransactionInfo();
    newTransaction.transaction_type = transaction.transaction_type;
    newTransaction.or_num = transaction.or_num;
    newTransaction.referrence_num = transaction.referrence_num;
    newTransaction.eye = transaction.eye;
    newTransaction.info_source = transaction.info_source;
    newTransaction.invoice_number = transaction.invoice_number;
    newTransaction.third_party_payor_code = transaction.third_party_payor_code;
    newTransaction.payment_type = transaction.payment_type;
    newTransaction.paid_amount = transaction.paid_amount;
    newTransaction.card_no = transaction.card_no;
    newTransaction.card_type = transaction.card_type;
    newTransaction.card_holder_name = transaction.card_holder_name;
    newTransaction.card_approval_code = transaction.card_approval_code;
    newTransaction.check_issued_date = transaction.check_issued_date;
    newTransaction.check_bank = transaction.check_bank;
    newTransaction.check_branch = transaction.check_branch;
    newTransaction.check_no = transaction.check_no;
    newTransaction.gcash_referrence = transaction.gcash_referrence;
    newTransaction.home_credit_order_id = transaction.home_credit_order_id;
    newTransaction.payment_date = transaction.payment_date;
    newTransaction.bill_ease_order_id = transaction.bill_ease_order_id;
    newTransaction.total = transaction.total;

    await TransactionInfo.save(newTransaction);

    return newTransaction;
};

export const updateTransaction = async (
    transactionFound: any,
    transaction: any,
) => {
    transactionFound.transaction_type = transaction.transaction_type;
    transactionFound.or_num = transaction.or_num;
    transactionFound.referrence_num = transaction.referrence_num;
    transactionFound.eye = transaction.eye;
    transactionFound.info_source = transaction.info_source;
    transactionFound.invoice_number = transaction.invoice_number;
    transactionFound.third_party_payor_code =
        transaction.third_party_payor_code;
    transactionFound.payment_type = transaction.payment_type;
    transactionFound.paid_amount = transaction.paid_amount;
    transactionFound.card_no = transaction.card_no;
    transactionFound.card_type = transaction.card_type;
    transactionFound.card_holder_name = transaction.card_holder_name;
    transactionFound.card_approval_code = transaction.card_approval_code;
    transactionFound.check_issued_date = transaction.check_issued_date;
    transactionFound.check_bank = transaction.check_bank;
    transactionFound.check_branch = transaction.check_branch;
    transactionFound.check_no = transaction.check_no;
    transactionFound.gcash_referrence = transaction.gcash_referrence;
    transactionFound.home_credit_order_id = transaction.home_credit_order_id;
    transactionFound.payment_date = transaction.payment_date;
    transactionFound.bill_ease_order_id = transaction.bill_ease_order_id;
    transactionFound.total = transaction.total;

    await TransactionInfo.save(transactionFound);

    return transactionFound;
};

export const deleteTransaction = async (transactionFound: any) => {
    return await TransactionInfo.softRemove(transactionFound);
};

export const getTransactionById = async (id: number, relation?: any) => {
    const transactionFound = await TransactionInfo.findOne({
        where: { id: id },
        relations: relation,
    });

    return transactionFound;
};

export const getTransactionByKey = async (
    key: any,
    value: any,
    relation?: any,
) => {
    const transactionFound = await TransactionInfo.findOne({
        where: { [key]: value },
        relations: relation,
    });

    return transactionFound;
};

export const addPackageTransaction = async (
    transaction: any,
    packageFound: any,
) => {
    await TransactionInfo.createQueryBuilder()
        .relation("transaction_package")
        .of(transaction)
        .add(packageFound);
    return;
};

export const removePackageTransaction = async (
    transaction: any,
    packageFound: any,
) => {
    await TransactionInfo.createQueryBuilder()
        .relation("transaction_package")
        .of(transaction)
        .remove(packageFound);
    return;
};

export const addServiceTransaction = async (
    transaction: any,
    serviceFound: any,
) => {
    await TransactionInfo.createQueryBuilder()
        .relation("transaction_service")
        .of(transaction)
        .add(serviceFound);
    return;
};

export const removeServiceTransaction = async (
    transaction: any,
    serviceFound: any,
) => {
    await TransactionInfo.createQueryBuilder()
        .relation("transaction_service")
        .of(transaction)
        .remove(serviceFound);
    return;
};
