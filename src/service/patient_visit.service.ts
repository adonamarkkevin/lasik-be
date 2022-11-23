import { PatientVisit } from "../entity/patient_visit.entity";

export const createVisit = async (visitBody: any) => {
    const newVisit = new PatientVisit();
    newVisit.pin = visitBody.pin;
    newVisit.remarks = visitBody.remarks;
    newVisit.info_source = visitBody.info_source;
    newVisit.eye = visitBody.eye;

    await PatientVisit.save(newVisit);
    return newVisit;
};

export const updateVisit = async (visitFound: any, visitBody: any) => {
    visitFound.pin = visitBody.pin;
    visitFound.remarks = visitBody.remarks;
    visitFound.info_source = visitBody.info_source;
    visitFound.eye = visitBody.eye;

    await PatientVisit.save(visitFound);
    return visitFound;
};

export const deleteVisit = async (visitFound: any) => {
    await PatientVisit.softRemove(visitFound);
    return;
};

export const getVisitById = async (id: number, relation?: any) => {
    const visitFound = await PatientVisit.findOne({
        where: { id: id },
        relations: relation,
    });

    return visitFound;
};

export const getVisitByKey = async (key: any, value: any, relation?: any) => {
    const visitFound = await PatientVisit.findOne({
        where: { [key]: value },
        relations: relation,
    });

    return visitFound;
};

export const addServiceVisit = async (visitFound: any, serviceFound: any) => {
    await PatientVisit.createQueryBuilder()
        .relation("service")
        .of(visitFound)
        .add(serviceFound);
    return;
};

export const removeServiceVisit = async (
    visitFound: any,
    serviceFound: any,
) => {
    await PatientVisit.createQueryBuilder()
        .relation("service")
        .of(visitFound)
        .remove(serviceFound);
    return;
};

export const addPackageVisit = async (visitFound: any, packageFound: any) => {
    await PatientVisit.createQueryBuilder()
        .relation("package")
        .of(visitFound)
        .add(packageFound);
    return;
};

export const removePackageVisit = async (
    visitFound: any,
    packageFound: any,
) => {
    await PatientVisit.createQueryBuilder()
        .relation("package")
        .of(visitFound)
        .remove(packageFound);
    return;
};

export const assignPatientVisit = async (
    visitId: number,
    patientID: number,
) => {
    if (patientID === 0) {
        await PatientVisit.createQueryBuilder()
            .relation("patient")
            .of(visitId)
            .set(null);
        return;
    }
    await PatientVisit.createQueryBuilder()
        .relation("patient")
        .of(visitId)
        .set(patientID);
    return;
};

export const visitBranch = async (visitId: number, clinicId: number) => {
    if (clinicId === 0) {
        await PatientVisit.createQueryBuilder()
            .relation("clinic")
            .of(visitId)
            .set(null);
        return;
    }
    await PatientVisit.createQueryBuilder()
        .relation("clinic")
        .of(visitId)
        .set(clinicId);
    return;
};

export const visitProviderInfo = async (visitId: number, tppId: number) => {
    if (tppId === 0) {
        await PatientVisit.createQueryBuilder()
            .relation("third_party_provider")
            .of(visitId)
            .set(null);
        return;
    }
    await PatientVisit.createQueryBuilder()
        .relation("third_party_provider")
        .of(visitId)
        .set(tppId);
    return;
};
