import { AppDataSource } from "./data-source";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";

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
