import { TransactionService } from "../entity/transaction_services.entity";

export const createTransactionService = async (service: any) => {
    const newService = new TransactionService();
    newService.name = service.name;
    newService.code = service.code;
    newService.price = service.price;
    newService.doctor_share = service.doctor_share;

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
    serviceFound.doctor_share = service.doctor_share;

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
