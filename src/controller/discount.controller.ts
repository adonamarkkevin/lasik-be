import { Request, Response } from "express";
import { Discount } from "../entity/discount.entity";
import {
    deleteDiscount,
    getDiscountById,
    getDiscountByKey,
    insertDiscount,
    upsertDiscount,
} from "../service/discount.service";

export const createDiscount = async (req: Request, res: Response) => {
    try {
        const { discount_code, rate, is_percent, discount_name } = req.body;
        const discountFound = await getDiscountByKey(
            "discount_code",
            discount_code,
        );

        if (discountFound) {
            return res.status(400).send({
                status: "Bad Request",
                message: "Discount code exist",
            });
        }

        await insertDiscount({
            discount_code,
            discount_name,
            rate,
            is_percent,
        });

        return res.send({
            status: "Success",
            message: "Discount Register Successful",
        });
    } catch (error) {
        return res.status(500).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};

export const updateDiscount = async (req: Request, res: Response) => {
    try {
        const { discountId } = req.params;
        const { discount_code, rate, is_percent, discount_name } = req.body;
        const discountFound = await getDiscountById(parseInt(discountId));

        if (!discountFound) {
            return res.status(404).send({
                status: "Not Found",
                message: "Discount code does not exist",
            });
        }

        const updatedDiscount = await upsertDiscount(discountFound, {
            discount_code,
            discount_name,
            rate,
            is_percent,
        });

        return res.send({
            status: "Success",
            message: "Discount Update Successful",
            data: updatedDiscount,
        });
    } catch (error) {
        return res.status(500).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};

export const getAllDiscount = async (req: Request, res: Response) => {
    try {
        const [allDiscount, count] = await Discount.find();

        return res.send({
            data: allDiscount,
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

export const getDiscount = async (req: Request, res: Response) => {
    try {
        const { discountId } = req.params;

        const discountFound = await getDiscountById(parseInt(discountId));

        if (!discountFound) {
            return res.status(404).send({
                status: "Not Found",
                message: "Discount code does not exist",
            });
        }

        return res.send(discountFound);
    } catch (error) {
        return res.status(500).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};

export const removeDiscount = async (req: Request, res: Response) => {
    try {
        const { discountId } = req.params;

        const discountFound = await getDiscountById(parseInt(discountId));

        if (!discountFound) {
            return res.status(404).send({
                status: "Not Found",
                message: "Discount code does not exist",
            });
        }

        await deleteDiscount(discountFound);

        return res.send({
            status: "Success",
            message: "Discount Removed Successful",
        });
    } catch (error) {
        return res.status(500).send({
            status: `Server Error`,
            message: `Please contact administrator`,
            error: error.message,
        });
    }
};
