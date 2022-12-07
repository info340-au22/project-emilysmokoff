import React from 'react';
import { Collapse } from 'bootstrap';

import { Link, NavLink } from 'react-router-dom';

export function NavigationBar (props) {
    const displayPages = [{id: "/", title: "Home"}, {id: "/BrowsePage", title: "Browse Products"},
    {id: "/RequestProduct", title: "Upload Products"}, {id: "/BookmarkedProducts", title: "Bookmarked Products"}];

    const navPages = displayPages.map((page) => {
        return(
            <li className="nav-item" key={page.id}>
                <NavLink className="nav-link" to={page.id} aria-label={page.title} href="">{page.title}</NavLink>
            </li>
        )
    });

    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            
            <div className="container-fluid">
                <Link className="nav-link" to="/">
                    <h1>EC<img src="img/logo.png" alt="logo representing letter o" />-LIFE</h1> </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {navPages}
                    </ul>
                    <form id="nav-search-form">
                            <input id="nav-search-input" type="text" name="search" placeholder=" Search for products" />
                        <span className="material-icons"type="button" id="nav-search-icon" aria-label="search icon">search</span>
                </form>
                    
                    <NavLink className="nav-link" to="/SignIn">
                        {/* <span className="material-icons" aria-label="Personal Profile">account_circle</span> */}
                        <img src={props.currentUser.userImg} className="navbar-profile-picture" alt="profile photo"/>
                    </NavLink>
                </div>
            </div>   
        </nav>

    );
}