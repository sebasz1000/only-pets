"use server"

const searchPets = async ({ query, limit} : { query: string, limit: number}) => {
    const URL = `https://dummyjson.com/products/search?q=${query}`
    const data = await fetch(URL)
    const {products} = await data.json()
    return products
}

export {
    searchPets
}