import React from 'react';

const Actors = ({ data }) => {
    const showBirthAndDeathYear = (birth_year, death_year) => {
        if (birth_year && death_year && birth_year !== "0" && death_year !== "0") {
            return <span className="text-opacity-50">({birth_year} - {death_year})</span>;
        }
    };

    return (<section className="actorSection">
        <h3 className="sectionTitle">Actors</h3>
        <div className="sectionList">
            {data.map((actor, index) => (<div className="actorSectionItem" key={index}>
                <h4>{actor.name} {showBirthAndDeathYear(actor.birth_year, actor.death_year)}</h4>
                <p>{actor.role}</p>
            </div>))}
        </div>
    </section>);
};

export default Actors;
