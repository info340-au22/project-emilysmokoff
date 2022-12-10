import React from 'react';

import { useParams } from 'react-router-dom';
import { useState } from 'react';

import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

import PRODUCTS from '../data/products.json';


export function ProductPage(props) {
    const urlParams = useParams();
    let currentProduct = PRODUCTS.filter((data) => {
        if (data.id == urlParams.id) {
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
    let buttonText = "Add to Bookmarks"
    const [bookmarkStatus, setBookmarkStatus] = useState(false);
    const handleClick = (event) => {
        setBookmarkStatus(!bookmarkStatus);
    }

    if (bookmarkStatus == true) {
        buttonText = "Bookmarked";
    }

    let currentProduct = props.currentProduct[0];
    if (currentProduct.category == "brands") {
        return (
            <main>
                <div className="product-card-container">
                    <div className="product-card">
                        <div>
                            <h3>{currentProduct.product}</h3>
                            <img className="product-img" src={currentProduct.image} alt={currentProduct.imageAlt} />
                            <p className="content">{currentProduct.company}</p>
                            <img className="rating-img" src={currentProduct.ratingImage} alt={currentProduct.ratingImageAlt} />
                            <p><button onClick={handleClick}>{buttonText}</button></p>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
    else {
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
                            <p><button onClick={handleClick}>{buttonText}</button></p>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

function Map(props) {
    const products = PRODUCTS
    const position = [37.7749, 122.4194]
    return (
        <div id="map">
            <h3>Product Availability: </h3>
            <MapContainer center={position} zoom={10} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {products.map(product => (
                <Marker 
                key = {product.id}
                position={[product.gps.latitude, product.gps.longitude]}>
                </Marker>))
                }
            </MapContainer>
        </div>
    )
}

/*function Map(props) {
    let currentProduct = props.currentProduct[0];
    return (
        <div className="map-card">
                <h3>Availability near me</h3>
                <p><button>Show availibility on maps</button></p>
                <img className="map-img" src={"../img/map.jpeg"} alt={currentProduct.imageAlt} />
        </div>
    )
}
*/

