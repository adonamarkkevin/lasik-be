import { Packcage } from "../entity/packages.entity";

export const createPackage = async (packBody: any) => {
    const newPackage = new Packcage();
    newPackage.code = packBody.code;
    newPackage.name = packBody.name;
    newPackage.price = packBody.price * 100;
    newPackage.facility_fee = packBody.facility_fee * 100;
    newPackage.doctor_share = packBody.doctor_share * 100;
    newPackage.professional_share = packBody.professional_share * 100;

    await Packcage.save(newPackage);
    return newPackage;
};

export const updatePackage = async (packageFound: any, packBody: any) => {
    packageFound.code = packBody.code;
    packageFound.name = packBody.name;
    packageFound.price = packBody.price * 100;
    packageFound.facility_fee = packBody.facility_fee * 100;
    packageFound.doctor_share = packBody.doctor_share * 100;
    packageFound.professional_share = packBody.professional_share * 100;
    packageFound.service = packBody.services;

    await Packcage.save(packageFound);
    return packageFound;
};

export const deletePackage = async (packageFound: any) => {
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

export const addRelateService = async (pckgId: number, srvcId: number) => {
    await Packcage.createQueryBuilder()
        .relation("service")
        .of(pckgId)
        .add(srvcId);
    return;
};

export const removeRelateService = async (
    packageFound: any,
    serviceFound: any,
) => {
    await Packcage.createQueryBuilder("package")
        .relation("package.service")
        .of(packageFound)
        .remove(serviceFound);
    return;
};
