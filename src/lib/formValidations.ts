import { SignUpForm, FormInputError, LoginForm } from "@/types";

export const emailIsValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


export const isValidEmail = (email: string): string | null => {

    if (email.length === 0) {
        return "Email field shouldn't be empty"
    } else if (!emailIsValid(email)) {
        return "Email is not valid"
    }
    return null

}

export const isValidNewPasswordConditions = <T>(newPassword: string, errorState: FormInputError<T>): FormInputError<T> => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    console.log(passwordRegex.test(newPassword))
    if (passwordRegex.test(newPassword))
        return { ...errorState, newPassword: null }

    return { ...errorState, newPassword: "Password must contain 8 characters, at least 1 capital letter and 1 number" }

}

export const isValidPassword = (password: string): string | null => {
    if (password.length === 0)
        return "Password field shouldn't be empty"

    return null
}

export const isValidUsername = (username: string): string | null => {
    if (username.length === 0)
        return "Username field shouldn't be empty"
    if (username.length < 4)
        return "Username is too short"

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
    if (!checked)
        return "Please check terms and conditions checkbox"

    return null
}

export const validateSignupInputs = (state: SignUpForm, currentErrors: FormInputError<SignUpForm>): FormInputError<SignUpForm> => {

    const inputErrors: FormInputError<SignUpForm> = { ...currentErrors }

    for (const inputName in state) {
        if (inputName === "username") {
            inputErrors[inputName] = isValidUsername(state[inputName])
        } else if (inputName === "email") {
            inputErrors[inputName] = isValidEmail(state[inputName])
        } else if (inputName === "newPassword" && !inputErrors[inputName]) {
            inputErrors[inputName] = isValidPassword(state[inputName])
        } else if (inputName === "passwordConfirmation") {
            inputErrors[inputName] = isPasswordConfirmed(state.newPassword, state[inputName])
        } else if (inputName === "termsConditions") {
            inputErrors[inputName] = isTermsConditionsChecked(state[inputName])
        }
    }//for

    return inputErrors
}


export const validateSinginInputs = (state: LoginForm, currentErrors: FormInputError<LoginForm>): FormInputError<LoginForm> => {

    const inputErrors: FormInputError<LoginForm> = { ...currentErrors }

    for (const inputName in state) {
        if (inputName === "email") {
            inputErrors[inputName] = isValidEmail(state[inputName])
        } else if (inputName === "password") {
            inputErrors[inputName] = isValidPassword(state[inputName])
        }
    }//for

    return inputErrors
}