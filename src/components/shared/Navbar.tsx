import Link from "next/link"
import { SearchBar } from "../ui/SearchBar"
import { UsersList } from "../ui/UsersList"
import { Suspense } from "react"

export default function Navbar() {
  return <nav>
    <div className="flex justify-between items-center w-full px-4 py-2 mb-4">
      <div><span>OnlyPets</span></div>
      <Suspense>
        <SearchBar >
          <UsersList />
        </SearchBar>
      </Suspense>
      <div className="w-[44px] h-[44px] md:w-[50px] md:h-[50px] rounded-full overflow-hidden border-1 border-white">
        <Link href="/profile" >
          <img src="https://cdn.pixabay.com/photo/2025/06/20/10/47/dog-9670619_1280.jpg"   className="w-full h-full object-cover"/>
        </Link>
      </div>
    </div>
  </nav>
}