import { Service } from "../entity/services.entity";

export const createService = async (service: any) => {
    const newService = new Service();
    newService.name = service.name;
    newService.code = service.code;
    newService.price = service.price;
    newService.facility_fee = service.facility_fee;
    newService.doctor_share = service.doctor_share;
    newService.professional_share = service.professional_share;

    await Service.save(newService);
    return newService;
};

export const updateService = async (serviceFound: any, service: any) => {
    serviceFound.name = service.name;
    serviceFound.code = service.code;
    serviceFound.price = service.price;
    serviceFound.facility_fee = service.facility_fee;
    serviceFound.doctor_share = service.doctor_share;
    serviceFound.professional_share = service.professional_share;

    await Service.save(serviceFound);
    return serviceFound;
};

export const deleteService = async (serviceFound: any) => {
    await Service.softRemove(serviceFound);
    return;
};

export const getServiceById = async (id: number, relation?: any) => {
    const serviceFound = await Service.findOne({
        where: { id: id },
        relations: relation,
    });
    return serviceFound;
};

export const getServiceByKey = async (key: any, value: any, relation?: any) => {
    const serviceFound = await Service.findOne({
        where: { [key]: value },
        relations: relation,
    });
    return serviceFound;
};

export const addRelatePackage = async (
    serviceFound: any,
    packageFound: any,
) => {
    await Service.createQueryBuilder()
        .relation("package")
        .of(serviceFound)
        .add(packageFound);
    return;
};

export const removeRelatePackage = async (
    serviceFound: any,
    packageFound: any,
) => {
    await Service.createQueryBuilder()
        .relation("package")
        .of(serviceFound)
        .remove(packageFound);
    return;
};
