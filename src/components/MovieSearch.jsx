import { useState, useEffect, use } from "react";
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


export default function MovieSearch() {
  const API_KEY = import.meta.env.VITE_APIKEY;

  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [movie, setMovie] = useState(null)


  useEffect(() => {
    // Only debounce if query exists
    if (!query) {
      setMovie(null); // If query is empty, reset the movie data
      return;
    }

    const timeoutId = setTimeout(() => {
      setLoading(true);
      async function handleApiCall() {
        try {
          const url = `http://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}&t=${encodeURIComponent(query)}`;
          const res = await fetch(url);
          const data = await res.json();
          setMovie(data);
        } catch (error) {
          console.log(error.message);
        } finally {
          setLoading(false);
        }
      }

      handleApiCall();
    }, 600); // Debounce delay (500ms)

    // Cleanup function to clear the timeout if query changes before 500ms
    return () => clearTimeout(timeoutId);

  }, [query, API_KEY]);


  return (
    <>
      <div className="search-bar flex justify-around align-center text-white p-20 ml-[183px]">
        <div>
          <i className="fa-solid fa-magnifying-glass"></i>
          <Input className="ml-[20px] text-4xl" placeholder="Movie Name" onChange={(e) => {
            setQuery(e.target.value)
          }} />
          <div className="mr-20 mt-10">

            <p>Enter Movie With Proper Spaces And In a capitalized Format (First Letter Captial)</p>
          </div>
        </div>
      </div>
      {loading && (
        <p className="text-center text-white text-xl">Loading....</p>
      )}
      {movie && (
  <div className="flex items-center text-white flex-col">
    {/* Movie Table */}
    <Table className="text-white">
      <TableCaption>Movie Info</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-white w-[100px]">Title</TableHead>
          <TableHead className="text-white">Year</TableHead>
          <TableHead className="text-white">Rated</TableHead>
          <TableHead className="text-white">Released</TableHead>
          <TableHead className="text-white">Genre</TableHead>
          <TableHead className="text-white">Director</TableHead>
          <TableHead className="text-white">Actors</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">{movie.Title}</TableCell>
          <TableCell>{movie.Year}</TableCell>
          <TableCell>{movie.Rated}</TableCell>
          <TableCell>{movie.Released}</TableCell>
          <TableCell>{movie.Genre}</TableCell>
          <TableCell>{movie.Director}</TableCell>
          <TableCell>{movie.Actors}</TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <div className="">
      <img src={movie.Poster} alt={movie.Title} className="w-48 h-auto mt-10" />
    </div>
  </div>
)}
    </>
  )
}