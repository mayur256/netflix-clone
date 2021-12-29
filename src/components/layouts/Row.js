import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import movieTrailer from 'movie-trailer';
import axios from "../../axios";
import './Row.css';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl, isLargeRow}){
    //Initializing state movies = []
    const [movies, setMovies] = useState([]);
    //Initializing state trailerUrl
    const [trailerUrl, setTrailerUrl] = useState("");

    //Using Effect hook to fetch movies info
    useEffect(() => {
        async function fetchMovies(){
            const movieData = await axios.get(fetchUrl);
            setMovies(movieData.data.results)
        }

        fetchMovies();
    }, [fetchUrl]); //fetchUrl is now a dependency for useEffect
    
    //options for react-youtube component
    const opts = {
        height: "390px",
        width: "100%",
        playerVars:{
            autoplay: 1
        }
    };

    //Event Handler function
    const movieClicked = movie => {
        if(trailerUrl) setTrailerUrl('')
        else{
            movieTrailer(movie?.name || '')
                .then(movieUrl => {
                    if(movieUrl){
                        const urlParams = new URL(movieUrl);
                        setTrailerUrl(urlParams.searchParams.get('v'));
                    }
                })
                .catch(err => console.log(err));
        }
    }

    return(
        <div className="row">
            {/** Title for the row*/}
            <h2>{title}</h2>

            {/** Container to display movie posters */}
            <div className="row__posters" title={`${trailerUrl ? 'Close Movie Trailer' : 'Open Movie Trailer'}`}>
                {movies.map(movie => {
                    return (<img 
                                onClick={() => {movieClicked(movie)}}
                                key={movie.id} 
                                className={`row__poster ${isLargeRow && 'row_poster_large'}`} 
                                src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                                alt={movie.name} 
                            />)
                })}
            </div>

            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
        </div>
    );
}

export default Row;