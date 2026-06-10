import { isValidNewPasswordConditions, } from "@/lib/formValidations";
import type { LoginForm, SignUpForm, FormInputError } from "@/types"
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from "react"


export const useForm = <T>(
    initFormState: T,
    initErrorState: FormInputError<T>,
    validate: (state: T, initErrors: FormInputError<T>) => FormInputError<T>
) => {

    const [formState, setFormState] = useState<T>(initFormState)
    const [error, setError] = useState<FormInputError<T>>(initErrorState)
    const [isLoading, setIsloading] = useState(false)
    const router = useRouter()

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        const finalValue = type === "checkbox" ? checked : value

        if (name === "newPassword" && (typeof finalValue === "string")) {
            const newError = isValidNewPasswordConditions<T>(finalValue, error)
            setError(newError)
        }

        setFormState((prevState) => ({
            ...prevState,
            [name]: finalValue
        }))

    }

    const handleSubmit = async (callback: () => Promise<void>): Promise<void> => {
        const inputErrors: FormInputError<T> = validate(formState, error)
        const hasError = Object.values(inputErrors).some(error => error !== null)
        if (hasError) {
            setError(inputErrors)
            return
        }
        setError(initErrorState)
        setIsloading(true)
        await callback()
        setIsloading(false)
        router.push("/")
    }



    return {
        formState,
        setFormState,
        handleInputChange,
        isLoading,
        error,
        handleSubmit
    }
}