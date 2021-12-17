import React from 'react';

const Genres = ({ data }) => {
    return (
        <section className="genreSection">
            <h3 className="sectionTitle">Genres</h3>
            <div className="genreList">
                {data.map((item, index) => (
                    <p key={`genre-${index}`} className="genreItem text-bold">{item}</p>
                ))}
            </div>

        </section>
    );
};

export default Genres;
