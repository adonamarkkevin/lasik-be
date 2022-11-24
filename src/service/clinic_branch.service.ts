import { Clinic } from "../entity/clinic_branch.entity";

export const createClinic = async (clinic: any) => {
    const newClinic = new Clinic();
    newClinic.hosp_code = clinic.hosp_code;
    newClinic.name = clinic.name;
    newClinic.address = clinic.address;
    newClinic.city_municipality = clinic.city_municipality;
    newClinic.province = clinic.province;
    newClinic.zip_code = clinic.tel_no;
    newClinic.mobile_no = clinic.mobile_no;
    newClinic.email = clinic.email;

    await Clinic.save(newClinic);

    return newClinic;
};

export const updateClinic = async (clinicFound: any, clinic: any) => {
    clinicFound.hosp_code = clinic.hosp_code;
    clinicFound.name = clinic.name;
    clinicFound.address = clinic.address;
    clinicFound.city_municipality = clinic.city_municipality;
    clinicFound.province = clinic.province;
    clinicFound.zip_code = clinic.tel_no;
    clinicFound.mobile_no = clinic.mobile_no;
    clinicFound.email = clinic.email;

    await Clinic.save(clinicFound);

    return clinicFound;
};

export const getClinicById = async (id: number, relation?: any) => {
    const clinicFound = await Clinic.findOne({
        where: { id: id },
        relations: relation,
    });

    return clinicFound;
};

export const deleteClinic = async (clinicFound: any) => {
    await Clinic.softRemove(clinicFound);
    return;
};

export const getClinicByKey = async (key: any, value: any, relation?: any) => {
    const clinicFound = await Clinic.findOne({
        where: { [key]: value },
        relations: relation,
    });
    return clinicFound;
};
