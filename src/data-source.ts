import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { UserInfo } from "./entity/user_info.entity";
import { Clinic } from "./entity/clinic_branch.entity";
import { Department } from "./entity/department.entity";
import { Service } from "./entity/services.entity";
import { Packcage } from "./entity/packages.entity";
dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [UserInfo, Clinic, Department, Service, Packcage],
    // migrations: [],
    // subscribers: [],
});
