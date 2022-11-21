import { UserInfo } from "../entity/user_info.entity";
import { hash } from "bcrypt";
import * as dotenv from "dotenv";
dotenv.config();

export const createUser = async (user: any) => {
    const userInfo = new UserInfo();
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

    await UserInfo.save(userInfo);

    return userInfo;
};

export const updateUser = async (userInfo: any, user: any) => {
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

    await UserInfo.save(userInfo);

    return userInfo;
};

export const getUserById = async (id: number) => {
    const userFound = await UserInfo.findOne({
        where: { id: id },
        select: ["password"],
    });

    return userFound;
};

export const getUserByEmail = async (email: string) => {
    const userFound = await UserInfo.findOne({
        where: { email: email },
    });
    return userFound;
};

export const deleteUser = async (userInfo: any) => {
    await UserInfo.softRemove(userInfo);
};

export const getUserByKey = async (key: any, value: any) => {
    const userFound = await UserInfo.findOne({
        where: { [key]: value },
        select: ["password"],
    });
    return userFound;
};
