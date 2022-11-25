import { UserInfo } from "../entity/user_info.entity";
import { hash } from "bcrypt";
import * as dotenv from "dotenv";
dotenv.config();

export const createUser = async (user: any) => {
    const userInfo = new UserInfo();
    userInfo.user_name = user.user_name;
    userInfo.firstName = user.firstName;
    userInfo.lastName = user.lastName;
    userInfo.middleName = user.middleName;
    userInfo.email = user.email;
    userInfo.gender = user.gender;
    userInfo.civil_status = user.civil_status;
    userInfo.birthday = user.birthday;
    userInfo.address = user.address;
    userInfo.contact = user.contact;

    if (user.password !== undefined) {
        userInfo.password = await hash(
            user.password,
            parseInt(process.env.SALT_ROUNDS),
        );
    }

    await UserInfo.save(userInfo);

    return userInfo;
};

export const updateUser = async (userInfo: any, user: any) => {
    userInfo.user_name = user.user_name;
    userInfo.password =
        user.password === undefined ? null : await hash(user.password, 10);
    userInfo.firstName = user.firstName;
    userInfo.lastName = user.lastName;
    userInfo.middleName = user.middleName;
    userInfo.email = user.email;
    userInfo.gender = user.gender;
    userInfo.civil_status = user.civil_status;
    userInfo.birthday = user.birthday;
    userInfo.address = user.address;
    userInfo.contact = user.contact;

    await UserInfo.save(userInfo);

    return userInfo;
};

export const getUserById = async (id: number, relation?: any) => {
    const userFound = await UserInfo.findOne({
        where: { id: id },
        relations: relation,
    });

    return userFound;
};

export const deleteUser = async (userInfo: any) => {
    await UserInfo.softRemove(userInfo);
    return;
};

export const getUserByKey = async (key: any, value: any) => {
    const userFound = await UserInfo.createQueryBuilder("user")
        .addSelect("user.password")
        .where({ [key]: value })
        .getOne();
    return userFound;
};

export const assignClinic = async (userId: number, clinicId: number) => {
    if (clinicId === 0) {
        await UserInfo.createQueryBuilder()
            .relation("clinic")
            .of(userId)
            .set(null);
        return;
    }
    await UserInfo.createQueryBuilder()
        .relation("clinic")
        .of(userId)
        .set(clinicId);
    return;
};

export const assignDept = async (userId: number, deptId: number) => {
    if (deptId === 0) {
        await UserInfo.createQueryBuilder()
            .relation("department")
            .of(userId)
            .set(null);
        return;
    }
    await UserInfo.createQueryBuilder()
        .relation("department")
        .of(userId)
        .set(deptId);
    return;
};
