"use client"
import { validateSignupInputs } from "@/lib/formValidations";
import type { FormInputError, SignUpForm } from "@/types";
import { useForm } from "@/hooks/useForm";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { Loader } from "lucide-react";
import SocialLoginButtons from "./SocialLoginButtons";
import { SIGNUP_FORM_INPUTS } from "@/consts/forms";

const initErrorsState: FormInputError<SignUpForm> = {
    username: null,
    email: null,
    newPassword: null,
    passwordConfirmation: null,
    termsConditions: null
}

const initFormState: SignUpForm = {
    username: "",
    email: "",
    newPassword: "",
    passwordConfirmation: "",
    termsConditions: false
}

export default function SignUpForm({
    title
}: {
    title: string
}) {

    const {
        formState,
        handleInputChange,
        handleSubmit,
        isLoading,
        error
    } = useForm<SignUpForm>(initFormState, initErrorsState, validateSignupInputs)

    const opacityClass = isLoading ? "opacity-50" : ""

    const signUp = async (): Promise<void> => {
        console.log("Registering....")
        await new Promise((resolve) => setTimeout(resolve, 3000))
        console.log("Registered!!")
        console.log(`Registered user: ${formState.email} | password: ${formState.newPassword}`)
    }

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        handleSubmit(signUp)
    }

    return (
        <div className={`relative max-w-md w-[350px] mx-6 ${opacityClass} `}>
            {
                isLoading
                    ? <Loader size="40"
                        className="absolute top-[20%] left-[45%]" />
                    : null
            }
            <section className="flex flex-col w-full ">
                <h1 className="mb-3 text-2xl text-center">
                    {title}
                </h1>
                <form className="flex flex-col"
                    onSubmit={onSubmit}>
                    {
                        SIGNUP_FORM_INPUTS.map(input => {
                            const value = formState[input.name as keyof SignUpForm]
                            const errorMsg = error[input.name as keyof SignUpForm]
                            return <Input {...input}
                                onChange={handleInputChange}
                                error={errorMsg}
                                {...((input.type === "checkbox")
                                    ? { checked: value as boolean }
                                    : { value: value as string })}
                                key={input.name} />
                        })
                    }
                    <Button label="Log in"
                        type="submit"
                        disabled={isLoading} />
                </form>
                <Button type="button"
                    label="Forgot password?"
                    disabled={false} />
            </section>

            <SocialLoginButtons />

        </div>
    )
}