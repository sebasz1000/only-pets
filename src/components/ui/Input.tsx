"use client"
import { Eye, EyeOff } from "lucide-react"
import { ChangeEvent, HTMLInputTypeAttribute, useState } from "react"
import ErrorMsg from "./ErrorMsg"

export default function Input({
    placeholder,
    label,
    type,
    name,
    onChange,
    value,
    error,
    checked
}: {
    placeholder?: string
    label?: string
    type: HTMLInputTypeAttribute | undefined
    name: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    value: string
    error: string | null
    checked?: boolean
}) {

    const [isVisible, setIsVisible] = useState(false)
    const handleVisibility = () => {
        setIsVisible(prevState => !prevState)
    }

    const getInputType = (): HTMLInputTypeAttribute | undefined => {
        if (type !== "password") {
            return type
        } else {
            return isVisible ? "text" : type
        }
    }

    const isValid = error ? "border-red-500" : ""

    return (
        <div className="w-full relative">
            <input placeholder={placeholder}
                name={name}
                type={getInputType()}
                onChange={onChange} className={`border-1 p-3 text-blue rounded-xl my-2 w-full ${isValid}`}
                autoComplete="false"
                value={value}
            />
            {
                (type === "password")
                    ? <ShowHidePassword
                        onClick={handleVisibility}
                        isVisible={isVisible} />
                    : null
            }
            {
                error
                    ? <ErrorMsg error={error} />
                    : null
            }
        </div>)
}

function ShowHidePassword({
    onClick,
    isVisible
}:
    {
        onClick: (e: React.MouseEvent<HTMLDivElement>) => void
        isVisible: boolean
    }) {
    return (
        <div className="absolute top-4 right-4" onClick={onClick}>
            {
                isVisible
                    ? <EyeOff size="30" />
                    : <Eye size="30" />
            }

        </div>)
}