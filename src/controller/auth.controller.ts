import { Request, Response } from "express";
import {
    createUser,
    getUserByEmail,
    getUserById,
    getUserByKey,
} from "../service/user_info.service";
import * as EmailValidator from "email-validator";
import { compare } from "bcrypt";
import { generateToken } from "../middleware/auth.middleware";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const reqBody = req.body;
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
        const reqBody = req.body;

        const userFound = EmailValidator.validate(reqBody.email)
            ? await getUserByEmail(reqBody.email)
            : await getUserByKey(reqBody.user_name, reqBody.user_name);

        compare(reqBody.password, userFound.password, (err, data) => {
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
                    message: "Login Successfuly",
                    token: authUser,
                });
            } else {
                return res.status(401).send({
                    status: "Bad Request",
                    message: "Invalid Credentials",
                });
            }
        });
    } catch (error) {
        return res.status(500).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};
