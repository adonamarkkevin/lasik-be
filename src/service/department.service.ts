import { Department } from "../entity/department.entity";

export const createDep = async (department: any) => {
    const newDep = new Department();
    newDep.code = department.code;
    newDep.department = department.department;
    newDep.room_no = department.room_no;

    await Department.save(newDep);
    return newDep;
};

export const updateDep = async (depFound: any, department: any) => {
    depFound.code = department.code;
    depFound.department = department.department;
    depFound.room_no = department.room_no;

    await Department.save(depFound);
    return depFound;
};

export const getDepById = async (id: number, relation?: any) => {
    const depFound = await Department.findOne({
        where: { id: id },
        relations: relation,
    });

    return depFound;
};

export const deleteDep = async (depFound: any) => {
    await Department.softRemove(depFound);
    return;
};

export const getDepByKey = async (key: any, value: any, relation: any) => {
    const depFound = await Department.findOne({
        where: { [key]: value },
        relations: relation,
    });
    return depFound;
};
