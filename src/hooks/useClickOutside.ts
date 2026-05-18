import { useRouter } from "next/navigation"
import { RefObject, useEffect } from "react"

export const useClickOutside = (refElement: RefObject<HTMLDivElement | null>) => {

    const router = useRouter()

    //checks clicks outside the modal to close it
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (refElement.current && !refElement.current.contains(e.target as Node)) {
                router.back()
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => document.removeEventListener("mousedown", handleClickOutside)

    }, [router, refElement])


}