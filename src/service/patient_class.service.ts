import { PatientClass } from "../entity/patient_class.entity";

export const createPatientClass = async (patientClassBody: any) => {
    const newPatientClass = new PatientClass();
    newPatientClass.code = patientClassBody.code;
    newPatientClass.name = patientClassBody.name;

    await PatientClass.save(newPatientClass);
};

export const updatePatientClass = async (
    patienClassFound: any,
    patientClassBody: any,
) => {
    patienClassFound.code = patientClassBody.code;
    patienClassFound.name = patientClassBody.name;

    await PatientClass.save(patienClassFound);
    return patienClassFound;
};

export const deletePatientClass = async (patienClassFound: any) => {
    await PatientClass.softRemove(patienClassFound);
    return;
};

export const getPatientClassById = async (id: number, relation?: any) => {
    const patientClassFound = await PatientClass.findOne({
        where: { id: id },
        relations: relation,
    });
    return patientClassFound;
};

export const getPatientClassByKey = async (
    key: any,
    value: any,
    relation?: any,
) => {
    const patientClassFound = await PatientClass.findOne({
        where: { [key]: value },
        relations: relation,
    });
    return patientClassFound;
};
