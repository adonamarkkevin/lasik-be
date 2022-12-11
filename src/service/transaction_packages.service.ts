import { TransactionPackage } from "../entity/transaction_packages.entity";

export const createTransactionPackage = async (packBody: any) => {
    const newPackage = new TransactionPackage();
    newPackage.code = packBody.code;
    newPackage.name = packBody.name;
    newPackage.price = packBody.price;
    newPackage.facility_fee = packBody.facility_fee;
    newPackage.doctor_share = packBody.doctor_share;
    newPackage.professional_share = packBody.professional_share;
    newPackage.amount_paid = packBody.amount_paid;
    newPackage.transaction_service = packBody.service;

    await TransactionPackage.save(newPackage);
    return newPackage;
};

export const updateTransactionPackage = async (
    packageFound: any,
    packBody: any,
) => {
    packageFound.code = packBody.code;
    packageFound.name = packBody.name;
    packageFound.price = packBody.price;
    packageFound.facility_fee = packBody.facility_fee * 100;
    packageFound.doctor_share = packBody.doctor_share * 100;
    packageFound.professional_share = packBody.professional_share * 100;
    packageFound.amount_paid = packBody.amount_paid * 100;

    await TransactionPackage.save(packageFound);
    return packageFound;
};

export const deleteTransactionPackage = async (packageFound: any) => {
    await TransactionPackage.softRemove(packageFound);
    return;
};

export const getTransactionPackageById = async (id: number, relation?: any) => {
    const packageFound = await TransactionPackage.findOne({
        where: { id: id },
        relations: relation,
    });
    return packageFound;
};

export const getTransactionPackageByKey = async (
    key: any,
    value: any,
    relation?: any,
) => {
    const packageFound = await TransactionPackage.findOne({
        where: { [key]: value },
        relations: relation,
    });
    return packageFound;
};

export const addSrvcTransRelation = async (
    transPckgFound: any,
    transSrvcFound: any,
) => {
    await TransactionPackage.createQueryBuilder()
        .relation("transaction_service")
        .of(transPckgFound)
        .add(transSrvcFound);
    return;
};

export const removeSrvcTransRelation = async (
    transPckgFound: any,
    transSrvcFound: any,
) => {
    await TransactionPackage.createQueryBuilder()
        .relation("transaction_service")
        .of(transPckgFound)
        .remove(transSrvcFound);
    return;
};
