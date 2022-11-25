export const refCodeDate = () => {
    const date = Intl.DateTimeFormat("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "2-digit",
    }); // 11/12/2022
    const refDate = date.format(Date.now());
    return refDate.replace(/\//g, ""); // Output: 111222
};
