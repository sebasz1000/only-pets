import { useEffect } from "react"

export const useDisableScrolling = () => {
    //disables scrolling on modal load
    useEffect(() => {
        document.body.classList.add("overflow-hidden")
        return () => document.body.classList.remove("overflow-hidden")
    }, [])
}