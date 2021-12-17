import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import BasicInfo from "../components/detail/BasicInfo";
import Genres from "../components/detail/Genres";
import Actors from "../components/detail/Actors";
import { useQuery } from 'react-query';
import { getMovieDetails } from '../remote';
import axiosInstance from '../axios';

const MovieDetail = () => {
    const { id, region } = useParams();
    const {
        isLoading, isError, error, data, refetch
    } = useQuery(['getMovieDetails', id, region], () => getMovieDetails(id, region));
    const [formData, setFormData] = useState();
    const [editInputOpen, setEditInputOpen] = useState(false);
    const toggleInput = () => setEditInputOpen(!editInputOpen);

    const updateTitle = async () => {
        try {
            await axiosInstance.put(`/movie/updatetitle.php?title=${formData}&id=${id}`);
            await refetch();
            toggleInput();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        setFormData(data ? data.basic[0].primary_title : '');
    }, [data]);

    const handleChange = (e) => {
        setFormData(e.target.value);
    };

    return <main>
        {isError ? (<p>Error: {error.message}</p>) : null}
        {isLoading ? (<p>Loading...</p>) : <>
            <BasicInfo data={data.basic} isInputOpen={editInputOpen} action={updateTitle} formData={formData}
                       handleChange={handleChange}
                       toggleInput={toggleInput} />
            <Genres data={data.genres} />
            <Actors data={data.actors} />
        </>}
    </main>;
};

export default MovieDetail;
