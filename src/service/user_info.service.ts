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
    userInfo.firstName = user.firstName;
    userInfo.lastName = user.lastName;
    userInfo.middleName = user.middleName;
    userInfo.email = user.email;
    userInfo.gender = user.gender;
    userInfo.civil_status = user.civil_status;
    userInfo.birthday = user.birthday;
    userInfo.address = user.address;
    userInfo.contact = user.contact;
    userInfo.license_number = user.license_number;
    userInfo.licence_start = user.licence_start;
    userInfo.license_expires_in = user.license_expires_in;
    userInfo.ptr_no = user.ptr_no;
    userInfo.ptr_eff_date = user.ptr_eff_date;
    userInfo.ptr_exp_date = user.ptr_exp_date;
    userInfo.s2_no = user.s2_no;
    userInfo.s2_eff_date = user.s2_eff_date;
    userInfo.s2_exp_date = user.s2_exp_date;

    if (user.password !== undefined) {
        userInfo.password = await hash(
            user.password,
            parseInt(process.env.SALT_ROUNDS),
        );
    }

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
    const userFound = await UserInfo.findOne({
        where: { [key]: value },
    });
    return userFound;
};

export const getUserByUserName = async (user_name: string) => {
    const userFound = await UserInfo.createQueryBuilder("user")
        .addSelect("user.password")
        .where("user.user_name = :username", { username: user_name })
        .getOne();
    return userFound;
};

export const getUserByEmail = async (email: string) => {
    const userFound = await UserInfo.createQueryBuilder("user")
        .addSelect("user.password")
        .where("user.email = :email", { email: email })
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
