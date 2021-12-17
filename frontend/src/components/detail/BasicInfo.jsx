import React from 'react';
import { useParams } from "react-router-dom";

const BasicInfo = ({ data, isInputOpen, formData, action, handleChange, toggleInput }) => {
    const { region } = useParams();

    return (<section className="infoSection">
        {data.map((item, index) => (<div key={index}>
            <h2>{item.primary_title}
                <button className="btn-edit" onClick={() => toggleInput()}>Edit</button>
                {isInputOpen ? <>
                    <input className="input-edit" type="text" value={formData} onChange={(e) => handleChange(e)} />
                    <button className="btn-submit" type="submit" onClick={() => action()}>Submit
                    </button>
                </> : <></>}
            </h2>
            <h3><span className="text-opacity-50">{region} title: </span>{item.region_title}</h3>
            <h4><span className="text-opacity-50">Aired: </span>{item.start_year}</h4>
            <h4><span className="text-opacity-50">Runtime: </span>{item.runtime_minutes} minutes</h4>
        </div>))}
    </section>);
};

export default BasicInfo;
