"use client"
import { validateSignupInputs } from "@/lib/formValidations";
import type { FormInputError, SignUpForm } from "@/types";
import { useForm } from "@/hooks/useForm";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { Loader } from "lucide-react";
import SocialLoginButtons from "./SocialLoginButtons";

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

    const {
        username,
        email,
        newPassword,
        passwordConfirmation,
        termsConditions
    } = formState

    const opacityClass = isLoading ? "opacity-50" : ""

    const signUp = async (): Promise<void> => {
        console.log("Registering....")
        await new Promise((resolve) => setTimeout(resolve, 3000))
        console.log("Registered!!")
        console.log(`Registered user: ${email} | password: ${newPassword}`)
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
                    <Input placeholder="LunitaM..."
                        type="text"
                        name="username"
                        onChange={handleInputChange}
                        value={username}
                        error={error.username} />
                    <Input placeholder="Mobile number, username or email"
                        type="text"
                        name="email"
                        onChange={handleInputChange}
                        value={email}
                        error={error.email} />
                    <Input placeholder="Password"
                        type="password"
                        name="newPassword"
                        onChange={handleInputChange}
                        value={newPassword}
                        error={error.newPassword} />
                    <Input placeholder="Confirm Password"
                        type="password"
                        name="passwordConfirmation"
                        onChange={handleInputChange}
                        value={passwordConfirmation}
                        error={error.passwordConfirmation} />
                    <Input
                        type="checkbox"
                        name="termsConditions"
                        onChange={handleInputChange}
                        checked={termsConditions}
                        error={error.termsConditions}
                        label={"I accept terms and conditions"} />
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