import { Discount } from "../entity/discount.entity";

export const insertDiscount = async ({ discount_code, rate, is_percent }) => {
    const newDiscount = new Discount();
    newDiscount.discount_code = discount_code;
    newDiscount.rate = rate;
    newDiscount.is_percent = is_percent;
    await Discount.save(newDiscount);
    return newDiscount;
};

export const upsertDiscount = async (
    discountFound: any,
    { discount_code, rate, is_percent },
) => {
    discountFound.discount_code = discount_code;
    discountFound.rate = rate;
    discountFound.is_percent = is_percent;
    await Discount.save(discountFound);
    return discountFound;
};

export const getDiscountByKey = async (key: string, value: string) => {
    const discountFound = await Discount.findOne({
        where: {
            [key]: value,
        },
    });
    return discountFound;
};

export const getDiscountById = async (id: number) => {
    const discountFound = await Discount.findOne({
        where: {
            id: id,
        },
    });
    return discountFound;
};

export const deleteDiscount = async (discountFound: any) => {
    await Discount.softRemove(discountFound);
    return;
};
