import { Request, Response } from "express";
import {
    createUser,
    getUserByEmail,
    getUserById,
    getUserByKey,
    getUserByUserName,
    updateUser,
} from "../service/user_info.service";
import * as EmailValidator from "email-validator";
import { compare } from "bcrypt";
import { generateToken } from "../middleware/auth.middleware";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const reqBody = req.body;
        const userFound = await getUserByKey("user_name", reqBody.user_name);
        if (userFound) {
            return res.status(403).send({
                status: "Bad Request",
                message: "Username exist.",
            });
        }
        await createUser(reqBody);

        return res.send({
            status: "Success",
            message: "Register Successful",
        });
    } catch (error) {
        return res.status(500).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { user_access, password } = req.body;

        const userFound = EmailValidator.validate(user_access)
            ? await getUserByEmail(user_access)
            : await getUserByUserName(user_access);

        compare(password, userFound.password, (err, data) => {
            if (err) {
                return res.status(500).send({
                    status: `Server Error`,
                    message: `Please contact administrator`,
                    error: err.message,
                });
            }
            if (data) {
                const authUser = generateToken(userFound);
                return res.send({
                    status: "Success",
                    message: "Login Successfull",
                    token: authUser,
                });
            }
        });
    } catch (err) {
        return res.status(401).send({
            status: "Bad Request",
            message: "Invalid Credentials",
            error: err.message,
        });
    }
};

export const getCurrentUser = async (req: Request, res: Response) => {
    try {
        const currentUser = req.user;

        return res.send(currentUser);
    } catch (err) {
        return res.status(401).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: err.message,
        });
    }
};

export const changePassword = async (req: Request, res: Response) => {
    try {
        const currentUser = req.user;
        const userFound = await getUserByKey("id", currentUser.id);
        const { currentPassword, newPassword } = req.body;

        const updateUserPass = {
            password: newPassword,
        };

        compare(currentPassword, userFound.password, async (err, data) => {
            if (err) {
                return res.status(500).send({
                    status: `Server Error`,
                    message: `Please contact administrator`,
                    error: err.message,
                });
            }
            if (data) {
                await updateUser(userFound, updateUserPass);
                return res.send({
                    status: "Success",
                    message: "Password Change Successfull",
                });
            }
        });
    } catch (error) {
        return res.status(401).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};
