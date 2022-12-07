import React from 'react';

import { useParams } from 'react-router-dom';

import PRODUCTS from '../data/products.json';


export function ProductPage(props) {
    const urlParams = useParams();
    let currentProduct = PRODUCTS.filter((data) => {
        if(data.id == urlParams.id) {
            return data;
        }
    })
    return (
        <div>
            <PageTitle />
            <Product currentProduct={currentProduct} />
            <Map currentProduct={currentProduct} />
        </div>
    )
};

function PageTitle(props) {
    return (
        <header className='product-header'>
            <h2> Products</h2>
        </header>
    )
}

function Product(props) {
    let currentProduct = props.currentProduct[0];
    return (
        <main>
            <div className="product-card-container">
                <div className="product-card">
                    <div>
                        <h3>{currentProduct.product}</h3>
                        <img className="product-img" src={currentProduct.image} alt={currentProduct.imageAlt} />
                        <p className="price">{currentProduct.price}</p>
                        <p className="content">{currentProduct.company}</p>
                        <img className="rating-img" src={currentProduct.ratingImage} alt={currentProduct.ratingImageAlt} />
                        <p><button>Add to Cart</button></p>
                    </div>
                </div>
            </div>
        </main>
    )
}

function Map(props) {
    let currentProduct = props.currentProduct[0];
    return (
        <div className="map-card">
                <h3>Availability near me</h3>
                <p><button>Show availibility on maps</button></p>
                <img className="map-img" src={"../img/map.jpeg"} alt={currentProduct.imageAlt} />
        </div>
    )
}

