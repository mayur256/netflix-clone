import React, { useEffect, useState } from "react";
import axios from "../../axios";
import  requests from "../../requests";
import "./Banner.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Banner(){
    //Defining State
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        async function fetchMovie(){
            let netflixOriginals = await axios.get(requests.netflixOriginals);
            netflixOriginals = netflixOriginals.data.results;
            setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length - 1)]);
        }

        fetchMovie();
    }, []);

    //Truncates Movie description if it exceeds specified characters
    function truncate(desc, maxLength){
        if(!desc) return '';
        return desc.length > maxLength ? desc.slice(0, maxLength) + "..." : desc;
    }
    
    return (
        <div>
            <header className="banner"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: `url(${base_url}${movie?.backdrop_path})`,
                    backgroundPosition: 'center center'
                }}
            >
                <div className="banner_contents">
                    {/**Movie Title */}
                    <h1 className="movie_title">
                        {movie?.title || movie?.name || movie?.original_name}
                    </h1>

                    {/**Buttons in banner */}
                    <div className="banner_buttons">
                        <button className="banner_btn">Play</button>
                        <button className="banner_btn">My List</button>
                    </div>

                    {/**Movie Overview */}
                    <h2 className="movie_description">
                        {truncate(movie?.overview, 150)}
                    </h2>

                    <div className="banner_fade_bottom"></div>
                </div>
            </header>
        </div>
    );
}

export default Banner;