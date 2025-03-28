import { useState ,useEffect, use} from "react";

export default function MovieSearch(){
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
        <i className="text-4xl fa-solid fa-magnifying-glass"></i>
        <input onChange={(e) => {
            setQuery(e.target.value)
        }} className="focus:border-none focus:outline-none ml-[20px] text-4xl" type="text" placeholder="Movie Name" />
        <div className="mr-20 mt-10">
            <p>Enter Movie With Proper Spaces And In a capitalized Format (First Letter Captial)</p>
        </div>
        </div>
        </div>
        {loading && (
            <p className="text-center text-white text-xl">Loading....</p>
        )}
        {movie && (
            <div className="flex items-center justify-center p-10">
            <div className="text-white font- w-4xl flex items-center flex-col justify-center">
                <p>Movie : {movie.Title}</p>
                <p>Year : {movie.Year}</p>
                <p>Rated : {movie.Rated}</p>
                <p>Released : {movie.Released}</p>
                <p>Genre : {movie.Genre}</p>
                <p>Director : {movie.Director}</p>
                <p>Actors : {movie.Actors}</p>
                <p>Plot : {movie.Plot}</p>
                {movie.Poster && (
                    <img src={movie.Poster} alt={movie.Title} className="w-48 h-auto mr-6 mt-10" />
                )} 
            </div>
            </div>
        )}
      </>
    )
}