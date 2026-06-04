import { FormState, FormInputError } from "@/types"
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from "react"


export const useForm = (
    initFormState: FormState,
    initErrorState: FormInputError,
    validate: (state: FormState, initErrors: FormInputError) => FormInputError
) => {

    const [formState, setFormState] = useState<FormState>(initFormState)
    const [error, setError] = useState<FormInputError>(initErrorState)
    const [isLoading, setIsloading] = useState(false)
    const router = useRouter()

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormState((prevState) => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = async (callback: () => Promise<void>): Promise<void> => {
        const inputErrors: FormInputError = validate(formState, initErrorState)
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