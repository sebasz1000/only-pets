import { FormField } from "@/types";

export const LOGIN_FORM_INPUTS: FormField[] = [
    {
        name: "email",
        type: "text",
        placeholder: "Mobile number, username or email"
    },
    {
        name: "password",
        type: "password",
        placeholder: "Password"
    }
] as const

export const SIGNUP_FORM_INPUTS: FormField[] = [
    {
        name: "username",
        type: "text",
        placeholder: "Luna Maria...",

    },
    {
        name: "email",
        type: "text",
        placeholder: "Mobile number, username or email",
    },
    {
        name: "newPassword",
        type: "password",
        placeholder: "Type your password",
    },
    {
        name: "passwordConfirmation",
        type: "password",
        placeholder: "Confirm Password",
    },
    {
        name: "termsConditions",
        type: "checkbox",
        label: "I accept terms and conditions",

    }
] as const