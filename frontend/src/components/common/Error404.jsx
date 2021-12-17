import React from 'react';
import { Link } from "react-router-dom";

const Error404 = () => {
    return (<div className="errorContainer">
        <p className="error">Page Not Found</p>
        <Link to="/" className="error">
            Go back to home
        </Link>
    </div>);
};

export default Error404;
