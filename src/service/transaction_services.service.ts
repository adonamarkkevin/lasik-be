import { TransactionService } from "../entity/transaction_services.entity";

export const createTransactionService = async (service: any) => {
    const newService = new TransactionService();
    newService.name = service.name;
    newService.code = service.code;
    newService.price = service.price;
    newService.doctor_share = service.doctor_share;
    newService.professional_share = service.professional_share;
    newService.amount_paid = service.amount_paid;

    await TransactionService.save(newService);
    return newService;
};

export const updateTransactionService = async (
    serviceFound: any,
    service: any,
) => {
    serviceFound.name = service.name;
    serviceFound.code = service.code;
    serviceFound.price = service.price;
    serviceFound.doctor_share = service.doctor_share * 100;
    serviceFound.facility_fee = service.facility_fee * 100;
    serviceFound.professional_share = service.professional_share * 100;
    serviceFound.amount_paid = service.amount_paid * 100;
    serviceFound.discount_amount = service.discount_amount * 100;
    await TransactionService.save(serviceFound);
    return serviceFound;
};

export const deleteTransactionService = async (serviceFound: any) => {
    await TransactionService.softRemove(serviceFound);
    return;
};

export const getTransactionServiceById = async (id: number, relation?: any) => {
    const serviceFound = await TransactionService.findOne({
        where: { id: id },
        relations: relation,
    });
    return serviceFound;
};

export const getTransactionServiceByKey = async (
    key: any,
    value: any,
    relation?: any,
) => {
    const serviceFound = await TransactionService.findOne({
        where: { [key]: value },
        relations: relation,
    });
    return serviceFound;
};

export const assignDoctor = async (serviceId: number, doctorId: number) => {
    if (doctorId === 0) {
        await TransactionService.createQueryBuilder()
            .relation("assigned_doctor")
            .of(serviceId)
            .set(null);
        return;
    }
    await TransactionService.createQueryBuilder()
        .relation("assigned_doctor")
        .of(serviceId)
        .set(doctorId);
    return;
};

export const addPckgTransRelation = async (
    transSrvcFound: any,
    transPckgFound: any,
) => {
    await TransactionService.createQueryBuilder()
        .relation("transaction_package")
        .of(transSrvcFound)
        .add(transPckgFound);
    return;
};

export const removePckgTransRelation = async (
    transSrvcFound: any,
    transPckgFound: any,
) => {
    await TransactionService.createQueryBuilder()
        .relation("transaction_package")
        .of(transSrvcFound)
        .remove(transPckgFound);
    return;
};

export const addServiceQueue = async (serviceId: number, queueId: number) => {
    if (queueId === 0) {
        await TransactionService.createQueryBuilder()
            .relation("queue_internal")
            .of(serviceId)
            .set(null);
        return;
    }
    await TransactionService.createQueryBuilder()
        .relation("queue_internal")
        .of(serviceId)
        .set(queueId);
    return;
};
