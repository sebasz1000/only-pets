"use client"
import { Search} from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useRef, useState } from "react"


function SearchBar({ children } :{ children : React.ReactNode}){
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams() //readonly
    const timerRef = useRef<NodeJS.Timeout | null>(null)
    const [inputValue, setInputValue] = useState(searchParams.get("search")?.toString() ?? "")


    const handleSearch = useCallback((searchText: string) => {
        setInputValue(searchText)
        //deboucing!
        if(timerRef.current){
            clearTimeout(timerRef.current)
        }

        timerRef.current = setTimeout( () => {
            // New url get and set to route the browser
            const params = new URLSearchParams(searchParams) //changeable
            if(searchText){
                params.set("search", searchText)
            }else{
                params.delete("search")
            }

            const queryString = params.toString()
            const query = queryString ? `?${queryString}` : ""
            router.push(`${pathname}${query}`, { scroll: false})
        }, 400)
       

    }, [searchParams])

    return(
        <div className="flex w-40 md:w-80 flex-col bg-slate-200 md:py-2 md:px-3 py-2 px-2 rounded-3xl relative
        ">
            <div className="flex ">
                <label htmlFor="searchText" className="mr-1 md:mr-2">
                    <Search className='text-slate-400' size={22}/>
                </label>
        
                <input type="text"
                        className="bg-transparent text-black text-sm w-full"
                        value={inputValue}
                        placeholder="Lalo.." 
                        name="searchText"
                        id="searchText"
                        onChange={(e) => handleSearch(e.currentTarget.value)} />
            </div>
               { children }
        </div>
    )
    
}

export {SearchBar}