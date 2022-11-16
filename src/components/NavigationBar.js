import React from 'react';

export function NavigationBar (props) {
    const currentPage = props.currentPage;
    const displayPages = [{id: "HomePage", title: "Home"}, {id: "BrowsePage", title: "Browse Products"},
    {id: "RequestProduct", title: "Upload Products"}, {id: "BookmarkedProducts", title: "Bookmarked Products"}];

    const navPages = displayPages.map((page) => {
        if (page.id == currentPage) {
            return(
                <li className="nav-item" key={page.id}>
                    <a className="nav-link active"  
                    aria-current="page" aria-label={page.title} href="">{page.title}</a>
                </li>
        )}
        else {
            return(
                <li className="nav-item" key={page.id}>
                    <a className="nav-link" href="">{page.title}</a>
                </li>
        )}
    });

    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            
            <div className="container-fluid">
                <a className="nav-link" href="">
                    <h1>EC<img src="img/logo.png" alt="logo representing letter o" />-LIFE</h1> </a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {navPages}
                    </ul>

                    <form>
                        <span>
                            <input id="search-input" type="text" name="search" placeholder=" Search for products" />
                        </span>
                    </form>

                    <span className="material-icons" aria-label="search icon">search</span>
                    
                    <a href="profile.html"><span className="material-icons" aria-label="Personal Profile">account_circle</span></a>
                </div>
            </div>   
        </nav>
    );
}