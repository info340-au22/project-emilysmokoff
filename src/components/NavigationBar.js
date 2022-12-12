import React, {useState} from 'react';

import { Link, NavLink, useNavigate } from 'react-router-dom';
//This library says it is not in use, but if we dont include this import statement our nav bar won't expand for hamburger menu
import { Collapse } from 'bootstrap';


export function NavigationBar (props) {

    const navigate = useNavigate();

    const displayPages = [{id: "/", title: "Home"}, {id: "/BrowsePage", title: "Browse Products"},
    {id: "/RequestProduct", title: "Upload Products"}, {id: "/BookmarkedProducts", title: "Bookmarked Products"}];

    let userImg = "/img/null.png";
    if (props.currentUser != null) {
        userImg = props.currentUser.userImg;
    }

    const handleNavClick = (event, prop) => {
        if(prop === '/BrowsePage'){
            props.setStateCallback('');
        }
    }

    const navPages = displayPages.map((page) => {
        return(
            <li className="nav-item" key={page.id} onClick={(event) => handleNavClick(event, page.id)}>
                <NavLink className="nav-link" to={page.id} aria-label={page.title} href="">{page.title}</NavLink>
            </li>
        )
    });

    const [typedValue, setTypedValue] = useState("");
  
    const handleChange = (event) => {
      const value = event.target.value;
      setTypedValue(value); //update state and re-render!
    }
  
    const handleSubmit = (event) => {    
        props.applyFilterCallback(typedValue.toLowerCase()); 
        navigate('/BrowsePage');
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            
            <div className="container-fluid">
                <Link className="nav-link" to="/">
                    <h1>EC<img src="/img/logo.png" alt="logo representing letter o taken from freepik on Free Pik" />-LIFE</h1> </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {navPages}
                    </ul>
                    <form className="nav-search-form">
                        <input id="nav-search-input" className="nav-search-input" type="text" name="search" placeholder=" Search for products" onChange={handleChange} value={typedValue}/>
                        <span className="material-icons" type="button" id="nav-search-icon" aria-label="search icon" onClick={handleSubmit} >search</span>
                   </form>
                    
                    <NavLink className="nav-link" to="/UserProfile">
                        <img src={userImg} className="navProfile rounded-circle" alt="profile"/>
                    </NavLink>
                </div>
            </div>   
        </nav>

    );
}