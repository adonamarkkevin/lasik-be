import { UserInfo } from "../entity/user_info.entity";
import { hash } from "bcrypt";
import * as dotenv from "dotenv";
dotenv.config();

export const createUser = async (user: any, clinic?: any) => {
    const userInfo = new UserInfo();
    userInfo.user_name = user.user_name;
    userInfo.password =
        user.password !== null || undefined
            ? await hash(user.password, parseInt(process.env.SALT_ROUNDS))
            : null;
    userInfo.role = user.role;
    userInfo.firstName = user.firstName;
    userInfo.lastName = user.lastName;
    userInfo.middleName = user.middleName;
    userInfo.email = user.email;
    userInfo.gender = user.gender;
    userInfo.civil_status = user.civil_status;
    userInfo.birthday = user.birthday;
    userInfo.address = user.address;
    userInfo.contact = user.contact;
    userInfo.clinic = clinic;

    await UserInfo.save(userInfo);

    return userInfo;
};

export const updateUser = async (userInfo: any, user: any, clinic?: any) => {
    userInfo.user_name = user.user_name;
    userInfo.password =
        user.password !== null || undefined
            ? await hash(user.password, 10)
            : null;
    userInfo.role = user.role;
    userInfo.firstName = user.firstName;
    userInfo.lastName = user.lastName;
    userInfo.middleName = user.middleName;
    userInfo.email = user.email;
    userInfo.gender = user.gender;
    userInfo.civil_status = user.civil_status;
    userInfo.birthday = user.birthday;
    userInfo.address = user.address;
    userInfo.contact = user.contact;
    userInfo.clinic = clinic;

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
