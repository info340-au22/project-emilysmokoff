import React from 'react';
import { Header } from './Header.js';


import { useNavigate } from 'react-router-dom';

import PRODUCT_CATEGORIES from '../data/categories.json'

export function HomePage (props) {

    return (
        <div>
            <Header />
            <ProductCategories applyFilterCallback={props.applyFilterCallback} />
            <AboutUs />
        </div>
    );
}

function ProductCategories (props) {

    const navigate = useNavigate();

    const handleSubmit = (event, prop) => {
       props.applyFilterCallback(prop); 
       navigate('/BrowsePage');
    }


    const categories = PRODUCT_CATEGORIES.map((sustainableCategory) => {
        return (
        <div className="home-card" type="button" key={sustainableCategory.title}>
                <div className="category-link" onClick={(event) => handleSubmit(event, sustainableCategory.type)} >
                    <img src={sustainableCategory.image} alt={sustainableCategory.imageDescription} />
                    <h3>{sustainableCategory.title}</h3> 
                </div>
            </div>
        );
    });
    
    return (
        <main>
            <div className="second-heading">
                <ul>
                    <li><h2>Search by Sustainable Product Categories</h2></li>
                </ul>
            </div>

            <div className="home-card-container">
                {categories}
            </div>
        </main>
    );
}

function AboutUs (props) {
    return (
        <div className="about-us">
            <p>
                We hope to make knowledge about eco-friendly products accessible with the hope that everyone can do their part.
            </p>
            <p>
                Want to learn more about sustainability and why its important? 
                <a href="https://www.twi-global.com/technical-knowledge/faqs/faq-what-is-sustainability"> Visit Here.</a>
            </p>
            <h2><img src="../img/logo.png" alt="leaf logo" />Eco-Life</h2>
        </div>
    );
}