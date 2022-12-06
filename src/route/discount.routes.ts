import { Router } from "express";
import {
    createDiscount,
    getAllDiscount,
    removeDiscount,
    updateDiscount,
} from "../controller/discount.controller";
import { adminCheck, checkToken } from "../middleware/auth.middleware";

export const discountRoutes = Router();
discountRoutes.post(
    "/discount/create/",
    checkToken,
    adminCheck,
    createDiscount,
);
discountRoutes.put(
    "/discount/update/:discountId/",
    checkToken,
    adminCheck,
    updateDiscount,
);
discountRoutes.delete(
    "/discount/remove/:discountId/",
    checkToken,
    adminCheck,
    removeDiscount,
);
discountRoutes.get("/discount/view-all/", checkToken, getAllDiscount);
discountRoutes.get(
    "/discount/view-one/:discountId/",
    checkToken,
    getAllDiscount,
);
