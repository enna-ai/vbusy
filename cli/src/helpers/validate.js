import { dateRegex } from "./regex.js";

export const isValidDate = async (date) => {
    const dateInput = await date.match(dateRegex);
    if (!dateInput) {
        return false;
    }

    return dateInput;
};