import React from 'react';

import { useParams } from 'react-router-dom';
import { useState } from 'react';

import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

import PRODUCTS from '../data/products.json';
import AVAILABILITY from '../data/availability.json';

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
                            <p className="content">Brand: {currentProduct.company}</p>
                            <img className="rating-img" src={currentProduct.ratingImage} alt={currentProduct.ratingImageAlt} />
                            <p className="rating-justification">{currentProduct.ratingJustification}</p>
                            <a href={currentProduct.link}>Learn more about this brand here.</a>
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
                            <p className="content">Brand: {currentProduct.company}</p>
                            <img className="rating-img" src={currentProduct.ratingImage} alt={currentProduct.ratingImageAlt} />
                            <p className="rating-justification">{currentProduct.ratingJustification}</p>
                            <a href={currentProduct.link}>Learn more about or purchase this product here.</a>
                            <p><button onClick={handleClick}>{buttonText}</button></p>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

function Map(props) {
    const urlParams = useParams();
    const currentAvailability = AVAILABILITY.filter((data) => (data.productId == urlParams.id))
    const position = [37.7749, -122.4194]
    return (
        <div id="map">
            <h2>Product Availability: </h2>
            <div id="map-container">
                <MapContainer center={position} zoom={3} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {currentAvailability.map(location => (
                        <Marker
                            key={location.id}
                            position={[location.gps.latitude, location.gps.longitude]}>
                        </Marker>))
                    }
                </MapContainer>
            </div>
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

