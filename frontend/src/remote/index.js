import axiosInstance from "../axios";

export const getMovies = async (genre, region) => {
    const { data } = await axiosInstance.get(`/movie/getmovies.php?genre=${genre}&region=${region}`);
    return data;
};

export const getGenres = async () => {
    const { data } = await axiosInstance.get("/genre/getgenres.php");
    return data;
};

export const getRegions = async () => {
    const { data } = await axiosInstance.get("/region/getregions.php");
    return data;
};

export const getMovieDetails = async (movieId, movieRegion) => {
    const { data } = await axiosInstance.get(`/movie/getmoviedetails.php?id=${movieId}&region=${movieRegion}`);
    return data;
};

export const getEditHistory = async () => {
    const { data } = await axiosInstance.get("/movie/getedithistory.php");
    return data;
};
