import { dateRegex, emailRegex } from "./regex.js";

export const isValidDate = async (date) => {
    const dateInput = await date.match(dateRegex);
    if (!dateInput) {
        return false;
    }

    return dateInput;
};

export const isValidEmail = async (input) => {
    const emailInput = await input.match(emailRegex);
    if (!emailInput) {
        return false;
    }

    return emailInput;
};