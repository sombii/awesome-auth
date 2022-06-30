import {ValidationRule} from "react-hook-form/dist/types/validator";

export const emailValidationRegex: ValidationRule<RegExp> = {
    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    message: "Email not valid"
}

export const passwordValidationRegex: ValidationRule<RegExp> = {
    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    message: "At least 1 upper, 1 lower, 1 digit, 1 special char, > 8"
}