import { ThirdParty } from "../entity/third_party_provider.entity";

export const createTpp = async (tppBody: any) => {
    const newTpp = new ThirdParty();
    newTpp.type = tppBody.type;
    newTpp.third_party_code = tppBody.third_party_code;
    newTpp.name = tppBody.name;
    newTpp.tel_no = tppBody.tel_no;
    newTpp.fax_no = tppBody.fax_no;
    newTpp.address = tppBody.address;
    newTpp.tin = tppBody.tin;
    newTpp.contact_person1 = tppBody.contact_person1;
    newTpp.contact_person2 = tppBody.contact_person2;
    newTpp.contract_date = tppBody.contract_date;
    newTpp.contract_exp = tppBody.contract_exp;

    await ThirdParty.save(newTpp);

    return newTpp;
};

export const updateTpp = async (tppFound: any, tppBody: any) => {
    tppFound.type = tppBody.type;
    tppFound.third_party_code = tppBody.third_party_code;
    tppFound.name = tppBody.name;
    tppFound.tel_no = tppBody.tel_no;
    tppFound.fax_no = tppBody.fax_no;
    tppFound.address = tppBody.address;
    tppFound.tin = tppBody.tin;
    tppFound.contact_person1 = tppBody.contact_person1;
    tppFound.contact_person2 = tppBody.contact_person2;
    tppFound.contract_date = tppBody.contract_date;
    tppFound.contract_exp = tppBody.contract_exp;

    await ThirdParty.save(tppFound);

    return tppFound;
};

export const deleteTpp = async (tppFound: any) => {
    await ThirdParty.softRemove(tppFound);
    return;
};

export const getTppById = async (id: number, relation?: any) => {
    const tppFound = await ThirdParty.findOne({
        where: { id: id },
        relations: relation,
    });

    return tppFound;
};

export const getTppByKey = async (key: any, value: any, relation?: any) => {
    const tppFound = await ThirdParty.findOne({
        where: { [key]: value },
        relations: relation,
    });

    return tppFound;
};

export const relatePatienClass = async (
    tppFoundId: number,
    patientClassId: number,
) => {
    if (patientClassId === 0) {
        await ThirdParty.createQueryBuilder()
            .relation("patient_class")
            .of(tppFoundId)
            .set(null);

        return;
    }
    await ThirdParty.createQueryBuilder()
        .relation("patient_class")
        .of(tppFoundId)
        .set(patientClassId);

    return;
};
