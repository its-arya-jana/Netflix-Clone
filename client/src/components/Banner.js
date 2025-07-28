import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import requests from '../api/requests'; // You'll need to create this file


const Banner = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        const results = request.data.results;
        if (results.length > 0) {
          setMovie(
            results[Math.floor(Math.random() * results.length)]
          );
        }
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    }
    fetchData();
  }, []);

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + '...' : string;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: 'cover',
        backgroundImage: movie ? `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")` : '',
        backgroundPosition: 'center center',
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
};

export default Banner;