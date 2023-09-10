import { dateRegex, emailRegex } from "./regex.js";

export const isValidDate = async (date) => {
    const dateInput = await date.match(dateRegex);
    if (!dateInput) {
        return false;
    }

    return dateInput;
};

export const isValidEmail = (input) => {
    const emailInput = emailRegex.test(input);
    if (!emailInput) {
        return false;
    }

    return emailInput;
};