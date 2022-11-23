import { Packcage } from "../entity/packages.entity";

export const createPackage = async (packBody: any) => {
    const newPackage = new Packcage();
    newPackage.code = packBody.code;
    newPackage.name = packBody.name;
    newPackage.price = packBody.price;
    newPackage.facility_fee = packBody.facility_fee;
    newPackage.doctor_share = packBody.doctor_share;
    newPackage.professional_share = packBody.professional_share;

    await Packcage.save(newPackage);
    return newPackage;
};

export const updatePackage = async (packageFound: any, packBody: any) => {
    packageFound.code = packBody.code;
    packageFound.name = packBody.name;
    packageFound.price = packBody.price;
    packageFound.facility_fee = packBody.facility_fee;
    packageFound.doctor_share = packBody.doctor_share;
    packageFound.professional_share = packBody.professional_share;

    await Packcage.save(packageFound);
    return packageFound;
};

export const deleteService = async (packageFound: any) => {
    await Packcage.softRemove(packageFound);
    return;
};

export const getPackageById = async (id: number, relation?: any) => {
    const packageFound = await Packcage.findOne({
        where: { id: id },
        relations: relation,
    });
    return packageFound;
};

export const getPackageByKey = async (key: any, value: any, relation?: any) => {
    const packageFound = await Packcage.findOne({
        where: { [key]: value },
        relations: relation,
    });
    return packageFound;
};

export const addRelateService = async (
    packageFound: any,
    serviceFound: any,
) => {
    await Packcage.createQueryBuilder()
        .relation("service")
        .of(packageFound)
        .add(serviceFound);
};

export const removeRelateService = async (
    packageFound: any,
    serviceFound: any,
) => {
    await Packcage.createQueryBuilder()
        .relation("service")
        .of(packageFound)
        .remove(serviceFound);
};
