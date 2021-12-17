import React, { useState } from 'react';
import FilterSection from "../components/home/FilterSection";
import FilterItem from "../components/home/FilterItem";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getGenres, getMovies, getRegions } from "../remote";

const Home = () => {
    // Increase stale time to prevent constant data reloading
    const STALE_SIX_HOURS = 1000 * 60 * 360;
    const STALE_THIRTY_MINUTES = 1000 * 60 * 30;

    const [selectedGenre, setSelectedGenre] = useState("Action");
    const [selectedRegion, setSelectedRegion] = useState("FI");

    const movieQuery = useQuery(['getMovies', selectedGenre, selectedRegion], () => getMovies(selectedGenre, selectedRegion), {
        staleTime: STALE_THIRTY_MINUTES
    });

    const genreQuery = useQuery(['getGenres'], getGenres, {
        staleTime: STALE_SIX_HOURS
    });

    const regionQuery = useQuery(['getRegions'], getRegions, {
        staleTime: STALE_SIX_HOURS
    });

    const handleGenreChange = (e) => {
        setSelectedGenre(e.target.value);
    };

    const handleRegionChange = (e) => {
        setSelectedRegion(e.target.value);
    };

    return (<>
        <FilterSection>
            <FilterItem>
                <h2>Regions</h2>
                <select value={selectedRegion} onChange={handleRegionChange}>
                    {regionQuery.data ? regionQuery.data.map((region) => {
                        return <option key={region}>{region}</option>;
                    }) : <></>}
                </select>
            </FilterItem>
            <FilterItem>
                <h2>Genres</h2>
                <select value={selectedGenre} onChange={handleGenreChange}>
                    {genreQuery.data ? genreQuery.data.map((genre) => {
                        return <option key={genre}>{genre}</option>;
                    }) : <></>}
                </select>
            </FilterItem>
        </FilterSection>
        <main className="content">
            {movieQuery.isLoading ? (<p className="text-bold">Loading...</p>) : movieQuery.isError ? (
                <p className="text-bold">Error: {movieQuery.error.message}</p>) : (<>{movieQuery.data.map((movie, index) => (
                <Link className="movieItem text-semibold" key={index}
                      to={`/movie/${movie.title_id}/${selectedRegion}`}>
                    {movie.title}
                </Link>))}
            </>)}
        </main>
    </>);
};

export default Home;
