import React, {useState} from 'react';

import { Link, NavLink, useNavigate } from 'react-router-dom';
//This library says it is not in use, but if we dont include this import statement our nav bar won't expand for hamburger menu
// import { Collapse } from 'bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

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
        <Navbar collapseOnSelect expand="lg" className="navbar navbar-expand-lg navbar-dark nav">
            <Container>
                <Link className="nav-link" to="/">
                    <h1>EC<img src="/img/logo.png" alt="logo representing letter o taken from freepik on Free Pik" />-LIFE</h1> </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto mb-2 mb-lg-0">
                            {navPages}
                        </Nav>
                        <form className="nav-search-form">
                            <input id="nav-search-input" className="nav-search-input" type="text" name="search" placeholder=" Search for products" onChange={handleChange} value={typedValue}/>
                            <span className="material-icons" type="button" id="nav-search-icon" aria-label="search icon" onClick={handleSubmit} >search</span>
                        </form>                
                        <NavLink className="nav-link" to="/UserProfile">
                            <img src={userImg} className="navProfile rounded-circle" alt="profile"/>
                        </NavLink>
                    </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}