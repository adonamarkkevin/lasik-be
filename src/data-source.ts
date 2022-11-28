import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { UserInfo } from "./entity/user_info.entity";
import { Clinic } from "./entity/clinic_branch.entity";
import { Department } from "./entity/department.entity";
import { Service } from "./entity/services.entity";
import { Packcage } from "./entity/packages.entity";
import { ThirdParty } from "./entity/third_party_provider.entity";
import { TransactionPackage } from "./entity/transaction_packages.entity";
import { TransactionService } from "./entity/transaction_services.entity";
import { PatientClass } from "./entity/patient_class.entity";
import { TransactionInfo } from "./entity/transaction_info.entity";
import { Queue } from "./entity/queue.entity";
import { QueueInternal } from "./entity/queue_internal.entity";
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
    entities: [
        UserInfo,
        Clinic,
        Department,
        Service,
        Packcage,
        ThirdParty,
        TransactionInfo,
        TransactionPackage,
        TransactionService,
        PatientClass,
        Queue,
        QueueInternal,
    ],
    // migrations: [],
    // subscribers: [],
});
