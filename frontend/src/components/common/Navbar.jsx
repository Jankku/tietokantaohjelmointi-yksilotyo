import React from 'react';
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (<div className="navbar">
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-item nav-item-active" : "nav-item"}>
            Home
        </NavLink>

        <NavLink to="/history" className={({ isActive }) => isActive ? "nav-item nav-item-active" : "nav-item"}>
            History
        </NavLink>
    </div>);
};

export default Navbar;
