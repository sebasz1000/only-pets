import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Link from "next/link";
import { Loader } from "lucide-react";
import { validateSinginInputs } from "@/lib/formValidations";
import { useForm } from "@/hooks/useForm";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";
import type { FormInputError, LoginForm } from "@/types";
import { LOGIN_FORM_INPUTS } from "@/consts/forms";


const initErrors: FormInputError<LoginForm> = {
    email: null,
    password: null
}

const initFormState: LoginForm = {
    email: "",
    password: ""
}


export default function LoginForm({
    title
}: {
    title: string
}) {

    const {
        formState,
        error,
        handleInputChange,
        handleSubmit,
        isLoading
    } = useForm<LoginForm>(initFormState, initErrors, validateSinginInputs)


    const signIn = async (): Promise<void> => {
        console.log("Signin....")
        await new Promise((resolve) => setTimeout(resolve, 3000))
        console.log("Signed!!")
        console.log(`Logged user: ${formState.email} | password: ${formState.password}`)
    }

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        handleSubmit(signIn)
    }

    const opacityClass = isLoading ? "opacity-50" : ""

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
                        LOGIN_FORM_INPUTS.map(input => <Input {...input}
                            onChange={handleInputChange}
                            value={formState[input.name as keyof LoginForm]}
                            error={error[input.name as keyof LoginForm]}
                            key={input.name as keyof LoginForm} />)
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

            <section className="flex flex-col w-full mt-6">
                <p className="text-sm text-center">Not account yet? <Link href="/sign-up" ><span className="underline text-blue-500 hover:text-blue-400">Sign-up</span></Link></p>
            </section>

        </div>
    )
}
