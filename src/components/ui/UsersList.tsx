"use client"
import { searchPets } from "@/app/actions/users";
import { Product } from "@/types";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";


function UsersList(){
    const [pets, setPets] = useState<Product[]>([]) //!todo:change the type later
    const searchParams = useSearchParams()
    const searchQuery = searchParams.get("search") ?? ""
    const hasPets = pets.length > 0
    const [showList, setShowList] = useState(!!searchParams.get("search"))
    const hasSearchParamRef = useRef(!!searchParams.get("search"))
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const hasSearchParam = !!searchParams.get("search")
        if(hasSearchParamRef.current === hasSearchParam)
            return
            setShowList(hasSearchParam)
            hasSearchParamRef.current = hasSearchParam

    }, [searchQuery])

    useEffect(() => {
        if(!showList) return 

        searchPets({query: searchQuery, limit: 6 })
            .then(setPets)
            .catch(error => {
                let errorMSg = (error instanceof Error) ? error.message : "Weird error occurred"
                setError(errorMSg)
            })
    }, [searchQuery])

    if(error){
        <p>ERRORR!!</p>
    }
    if(!showList) return null

    if(!hasPets){
        return  <div className="mt-6 absolute top-5 left-0 w-80 bg-slate-200 -translate-x-23 md:-translate-x-0 px-3 py-2 max-h-[550px] b-local z-10 shadow-xl border-1 border-slate-500">
            <p className="text-xs text-center text-slate-600">There are not matches for this query</p>
        </div>
    }

    return(
            <ul className="mt-6 absolute top-5 left-0 w-80 bg-slate-200 -translate-x-23 md:-translate-x-0 max-h-[550px] overflow-y-auto b-local z-10 shadow-xl border-1 border-slate-500" >
                {
                    pets.map( ({category, id, title}, key) => { 
                    
                            const isLastElement = (pets.length - 1) === key
                            const borderString = !isLastElement ? "border-b-1  border-b-slate-500" : ""
                            return (
                            <Link href={`/product/${id}`}
                                   key={id} >
                            <li
                                className={`flex align-center ${borderString} py-3 px-5 hover:bg-slate-300`}>
                                <div className="flex flex-col justify-center text-black">
                                    
                                        <h3 className="text-md">{title}</h3>
                                        <span className="text-sm">{category}</span>
                                </div>
                            </li> 
                            </Link>
                        )})
                }
    </ul>)
    
}

export { UsersList }