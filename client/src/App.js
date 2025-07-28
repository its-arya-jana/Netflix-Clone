import React, { useState, useEffect } from 'react';
import axios from './api/axios';
import './App.css';

function App() {
  const [bannerMovie, setBannerMovie] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState([]);

  // --- IMPORTANT: This is the line you must change ---
  const API_KEY = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q'; // <-- REPLACE WITH YOUR REAL KEY

  const base_url = "https://image.tmdb.org/t/p/original/";

  // Effect for fetching the banner movie
  useEffect(() => {
    async function fetchBannerData() {
      try {
        const request = await axios.get(`/discover/tv?api_key=${API_KEY}&with_networks=213`);
        const results = request.data.results;
        setBannerMovie(results[Math.floor(Math.random() * results.length)]);
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    }
    fetchBannerData();
  }, [API_KEY]);

  // Effect for fetching the trending row movies
  useEffect(() => {
    async function fetchTrendingData() {
        try {
            const request = await axios.get(`/trending/all/week?api_key=${API_KEY}&language=en-US`);
            setTrendingMovies(request.data.results);
        } catch (error) {
            console.error("Error fetching trending data:", error);
        }
    }
    fetchTrendingData();
  }, [API_KEY]);

  return (
    <div className="app">
      {/* --- Banner Section --- */}
      <header
        className="banner"
        style={{
          backgroundSize: "cover",
          backgroundImage: bannerMovie ? `url("${base_url}${bannerMovie.backdrop_path}")` : '',
          backgroundPosition: "center center",
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">
            {bannerMovie?.title || bannerMovie?.name || bannerMovie?.original_name}
          </h1>
          <h1 className="banner__description">{bannerMovie?.overview}</h1>
        </div>
        <div className="banner--fadeBottom" />
      </header>

      {/* --- Row Section --- */}
      <div className="row">
        <h2>Trending Now</h2>
        <div className="row__posters">
          {trendingMovies.map(movie => (
            movie.poster_path && (
              <img
                key={movie.id}
                className="row__poster"
                src={`${base_url}${movie.poster_path}`}
                alt={movie.title}
              />
            )
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;