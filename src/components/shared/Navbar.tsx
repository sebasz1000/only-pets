import { SearchBar } from "../ui/SearchBar"
import { UsersList } from "../ui/UsersList"

export default function Navbar() {
  return <nav>
    <div className="flex justify-between items-center w-full px-4 py-2 border-1 border-white mb-4">
      <div><span>OnlyPets</span></div>
      <SearchBar >
        <UsersList />
      </SearchBar>
      <div>Profile</div>
    </div>
  </nav>
}