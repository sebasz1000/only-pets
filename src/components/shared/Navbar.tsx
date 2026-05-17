"use client"
import Link from "next/link"
import { SearchBar } from "../ui/SearchBar"
import { UsersList } from "../ui/UsersList"
import { Suspense } from "react"
import { Plus } from "lucide-react"
import { usePathname, useSearchParams } from "next/navigation"
import { CreatePostModal } from "../ui/CreatePostModal"

export default  function Navbar() {

  const searchParams = useSearchParams()
  const pathName = usePathname()
  const getCreatePostModal = () => searchParams.get("new-post") ?  <CreatePostModal /> : null

  return <nav>
    { getCreatePostModal() }
    <div className="flex justify-between items-center w-full px-4 py-2 mb-4">
      <div>
        <Link href="/"> 
          <span>OnlyPets</span>
        </Link>
        </div>
      <Suspense>
        <SearchBar >
          <UsersList />
        </SearchBar>
      </Suspense>
      <div className="flex gap-5">
        <Link href={`${pathName}?new-post=true`}>
          <button type="button" className="w-[50px] h-[50px] rounded-full hover:bg-slate-900 hover:cursor-pointer flex justify-center items-center transition-all duration-200" aria-label="Create post">
            <Plus size={24}/>
          </button>
        </Link>
        <div className="w-[44px] h-[44px] md:w-[50px] md:h-[50px] rounded-full overflow-hidden border-1 border-white">
          <Link href="/juan" >
            <img src="https://cdn.pixabay.com/photo/2025/06/20/10/47/dog-9670619_1280.jpg"   className="w-full h-full object-cover"/>
          </Link>
        </div>
      </div>
    </div>
  </nav>
}