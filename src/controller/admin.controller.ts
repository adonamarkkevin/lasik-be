import { Request, Response } from "express";
import { In, Not } from "typeorm";
import { UserInfo } from "../entity/user_info.entity";
import {
    assignClinic,
    assignDept,
    createUser,
    deleteUser,
    getUserById,
    getUserByKey,
    updateUser,
} from "../service/user_info.service";

export const addLasikUser = async (req: Request, res: Response) => {
    try {
        const reqBody = req.body;
        const userFound = req.user;
        const clinic = userFound.clinic;
        const lasikUser = await getUserByKey("email", reqBody.email);
        if (lasikUser) {
            return res.status(403).send({
                status: "Bad Request",
                message: "Email exist.",
            });
        }
        if (reqBody.deptId === undefined) {
            return res.status(403).send({
                status: "Bad Request",
                message: "Department ID is Required",
            });
        }

        const createdUser = await createUser(reqBody);
        await assignDept(createdUser.id, reqBody.deptId);
        await assignClinic(createdUser.id, clinic.id);

        return res.send({
            status: "Success",
            message: "Lasik User Register Successful",
        });
    } catch (error) {
        return res.status(500).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};

export const updateLasikUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const reqBody = req.body;
        const lasikUser = await getUserById(parseInt(userId));
        if (!lasikUser) {
            return res.status(403).send({
                status: "Not Found",
                message: "User does not exist.",
            });
        }

        const updateLasikUser = await updateUser(lasikUser, reqBody);

        return res.send({
            status: "Success",
            message: "Patient Update Successful",
            data: updateLasikUser,
        });
    } catch (error) {
        return res.status(500).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};

export const rmLasikUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const lasikUser = await getUserById(parseInt(userId));
        if (!lasikUser) {
            return res.status(403).send({
                status: "Not Found",
                message: "User does not exist.",
            });
        }

        await deleteUser(lasikUser);

        return res.send({
            status: "Success",
            message: "Lasik User Remove Successful",
        });
    } catch (error) {
        return res.status(500).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};

export const getOneUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const lasikUser = await getUserById(parseInt(userId));
        if (!lasikUser) {
            return res.status(403).send({
                status: "Not Found",
                message: "User does not exist.",
            });
        }
        return res.send(lasikUser);
    } catch (error) {
        return res.status(500).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};

export const viewAllUser = async (req: Request, res: Response) => {
    try {
        const userFound = req.user;
        const clinic = userFound.clinic;

        const [allUser, count] = await UserInfo.findAndCount({
            where: {
                clinic: {
                    id: clinic.id,
                },
            },
            relations: ["department"],
        });

        return res.send({
            data: allUser,
            count: count,
        });
    } catch (error) {
        return res.status(500).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};

export const viewUserPerRole = async (req: Request, res: Response) => {
    try {
        const { role } = req.params;
        const clinic = req.user.clinic;
        const [allUser, count] =
            clinic !== null // null clinic === super admin. No clinic or branch means super admin can see all doctors/employees on any branch
                ? role === "doctor"
                    ? await UserInfo.findAndCount({
                          where: {
                              department: {
                                  id: 12,
                              },
                              clinic: {
                                  id: clinic.id,
                              },
                          },
                          relations: ["department", "clinic"],
                      })
                    : await UserInfo.findAndCount({
                          where: {
                              department: {
                                  id: Not(In([12, 1, 2])),
                              },
                              clinic: {
                                  id: clinic.id,
                              },
                          },
                          relations: ["department", "clinic"],
                      })
                : role === "doctor"
                ? await UserInfo.findAndCount({
                      where: {
                          department: {
                              id: 12,
                          },
                      },
                      relations: ["department", "clinic"],
                  })
                : await UserInfo.findAndCount({
                      where: {
                          department: {
                              id: Not(In([12, 1, 2])),
                          },
                      },
                      relations: ["department", "clinic"],
                  });
        return res.send({
            data: allUser,
            count: count,
        });
    } catch (error) {
        return res.status(500).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};
