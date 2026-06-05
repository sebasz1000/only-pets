import { FormState, FormInputError } from "@/types";

export const emailIsValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


export const isValidEmail = (email: string): string | null => {

    if (email.length === 0) {
        return "Email field shouldn't be empty"
    } else if (!emailIsValid(email)) {
        return "Email is not valid"
    }
    return null

}

export const isValidPassword = (password: string): string | null => {
    if (password.length === 0) {
        return "Password field shouldn't be empty"
    }
    return null
}

export const isValidUsername = (username: string): string | null => {
    if (username.length === 0) {
        return "Username field shouldn't be empty"
    }
    return null
}

export const isPasswordConfirmed = (password: string, passwordConfirmation: string): string | null => {
    if (passwordConfirmation.length === 0) {
        return "Password Confirmation field shouldn't be empty"
    } else if (!(password === passwordConfirmation)) {
        return "Passwords confirmation are not the same"
    }
    return null
}

export const isTermsConditionsChecked = (checked: boolean): string | null => {
    if (!checked) {
        return "Please check terms and conditions checkbox"
    }
    return null
}

export const validateSignupInputs = (state: FormState, initErrors: FormInputError): FormInputError => {

    const inputErrors: FormInputError = { ...initErrors }

    for (const inputName in state) {
        if (inputName === "username") {
            inputErrors[inputName] = isValidUsername(state[inputName] as string)
        } else if (inputName === "email") {
            inputErrors[inputName] = isValidEmail(state[inputName] as string)
        } else if (inputName === "password") {
            inputErrors[inputName] = isValidPassword(state[inputName] as string)
        } else if (inputName === "passwordConfirmation") {
            console.log(isPasswordConfirmed(state.password as string, state[inputName] as string))
            inputErrors[inputName] = isPasswordConfirmed(state.password as string, state[inputName] as string)
        } else if (inputName === "termsConditions") {
            inputErrors[inputName] = isTermsConditionsChecked(state[inputName] as boolean)
        }
    }//for

    return inputErrors
}


export const validateSinginInputs = (state: FormState, initErrors: FormInputError): FormInputError => {

    const inputErrors: FormInputError = { ...initErrors }

    for (const inputName in state) {
        if (inputName === "email") {
            inputErrors[inputName] = isValidEmail(state[inputName] as string)
        } else if (inputName === "password") {
            inputErrors[inputName] = isValidPassword(state[inputName] as string)
        }
    }//for

    return inputErrors
}