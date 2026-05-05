"use server"

const searchPets = async ({ query, limit} : { query: string, limit: number}) => {
    const data = await fetch("https://jsonplaceholder.typicode.com/users")
    const res = await data.json()
    return res
}

export {
    searchPets
}