import { AppDataSource } from "./data-source";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { authRoutes } from "./route/auth.routes";
import { clinicRoutes } from "./route/clinic.routes";
import { deptRoutes } from "./route/deparment.routes";
import { srvcRoutes } from "./route/services.routes";
import { pckgRoutes } from "./route/packages.routes";
import { tppRoutes } from "./route/third_party_provider.routes";
import { transRoutes } from "./route/transaction.routes";
import { queueRoutes } from "./route/queue.routes";
import { pClassRoutes } from "./route/patient_class.routes";
import { patientRoutes } from "./route/patient.routes";

declare module "express" {
    export interface Request {
        user: any;
    }
}

AppDataSource.initialize()
    .then(async () => {
        const app = express();

        process.env.TZ = "Asia/Singapore";

        const corsOpts = {
            origin: true,
            methods: ["GET", "POST", "DELETE", "PUT"],
            allowedHeaders: ["Content-Type", "authorization", "x-access-token"],
            credentials: true,
            exposedHeaders: ["set-cookie"],
        };
        app.use(express.json());
        app.use(cors(corsOpts));

        //Routes
        app.use("/api/v1", authRoutes); // auth routes
        app.use("/api/v1", clinicRoutes); // clinic routes
        app.use("/api/v1", deptRoutes); // department routes
        app.use("/api/v1", srvcRoutes); // service routes
        app.use("/api/v1", pckgRoutes); // package routes
        app.use("/api/v1", tppRoutes); // third party provider routes
        app.use("/api/v1", transRoutes); // transaction routes
        app.use("/api/v1", queueRoutes); // transaction routes
        app.use("/api/v1", pClassRoutes); // patient class routes
        app.use("/api/v1", patientRoutes); // patient routes

        const PORT = process.env.PORT || 3006;
        // run app
        app.listen(PORT, () => {
            console.log(`server started on localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log("TypeORM connection error: ", error);
        process.exit(0);
    });
