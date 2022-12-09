import React from 'react';
import currentProductData from '../data/productData.json'
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    Annotation,
    ZoomableGroup
} from 'react-simple-maps';

import ReactToolTip from "react-tooltip";

import { MapContainer } from 'https://cdn.esm.sh/react-leaflet/MapContainer'
import { TileLayer } from 'https://cdn.esm.sh/react-leaflet/TileLayer'
import { useMap } from 'https://cdn.esm.sh/react-leaflet/hooks'

import {
    MapContainer,
    TileLayer,
    useMap,
  } from 'https://cdn.esm.sh/react-leaflet'

export function ProductPage(props) {
    return (
        <div>
            <PageTitle />
            <Product />
            <Map />
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
    return (
        <main>
            <div className="product-card-container">
                <div className="product-card">
                    <div>
                        <h3>{currentProductData.product}</h3>
                        <img className="product-img" src={currentProductData.image} alt={currentProductData.imageAlt} />
                        <p className="price">{currentProductData.price}</p>
                        <p className="content">{currentProductData.company}</p>
                        <img className="rating-img" src={currentProductData.ratingImage} alt={currentProductData.ratingImageAlt} />
                        <p><button>Add to Cart</button></p>
                    </div>
                </div>
            </div>
        </main>
    )
}


function Map(props) {
    const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

    const position = [51.505, -0.09]
    return (
        <div id="mapcontainer">
            <p>Product Availability:</p>
            <div id='mapid'>
                <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    )
}



