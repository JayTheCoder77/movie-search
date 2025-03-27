import { useState } from "react";

export default function MovieSearch(){
    const API_KEY = import.meta.env.VITE_APIKEY;

    const [query, setQuery] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleApiCall(){
        if(!query) {return}
        setLoading(true)
        try {
            const url = `http://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}&t=${encodeURIComponent(query)}`
            const res = await fetch(url)
            setQuery("")
        } catch (error) {
            console.log(error.message);
        }finally{
            setLoading(false)
        }

    }

    return (
      <>
        <div className="search-bar flex justify-around align-center text-white p-10 ml-[70px]">
        <div>
        <button onc className="cursor-pointer"><i className="text-4xl fa-solid fa-magnifying-glass"></i></button>
        <input onChange={(e) => {
            setQuery(e.target.value)
        }} className="focus:border-none focus:outline-none ml-[20px] text-4xl" type="text" placeholder="Enter A Movie" />
        </div>
        </div>
      </>
    )
}