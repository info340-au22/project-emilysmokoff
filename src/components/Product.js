import React from 'react';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth'
import { getDatabase, ref as dbRef, onValue, runTransaction } from 'firebase/database';

import { MapContainer, TileLayer, Marker } from 'react-leaflet';

import { ErrorScreen } from './ApproveProduct.js';

import AVAILABILITY from '../data/availability.json';

export function ProductPage(props) {
    const db = getDatabase();
    const urlParams = useParams();
    const productKey = urlParams.id - 1;
    const productRef = dbRef(db, "products/" + productKey);

    const [currentProduct, setCurrentProduct] = useState({});
    const [loadedProduct, setLoadedProduct] = useState(false);

    useEffect(() => {
        onValue(productRef, (snapshot) => {
            let tempObj = {};
            snapshot.forEach((productValue) => {
                const prodKey = productValue.key;
                const productData = productValue.val();
                tempObj[prodKey] = productData;
            });
            setCurrentProduct(tempObj);
            setLoadedProduct(true);
        })
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    if(loadedProduct === false) {
        return (
            <div className='no-results'>
                <p className='card-container'>Loading your product!</p>
            </div>
        );
    }
    else {
        return (
            <div>
                <PageTitle />
                <Product currentProduct={currentProduct} />
                <Map currentProduct={currentProduct} />
            </div>
        )
    }
};

function PageTitle(props) {
    return (
        <header className='product-header'>
            <h2> Products</h2>
        </header>
    )
}

function Product(props) {
    const [topMsg, setTopMsg] = useState("");
    let buttonText = "Add to Bookmarks";
    const auth = getAuth();
    let currentProduct = props.currentProduct;
    const db = getDatabase();
    const [bookmarkStatus, setBookmarkStatus] = useState(false)
    const productRef = dbRef(db, "products/" + (currentProduct.id - 1));
    useEffect(() => {
        onValue(productRef, (snapshot) => {
            if (auth.currentUser) {
                const product = snapshot.val()
                setBookmarkStatus(product.bookmarkUsers && (product.bookmarkUsers.includes(auth.currentUser.userId)))
            }
        });
    }, []);
    const productBookmarkUsersRef = dbRef(db, "products/" + (currentProduct.id - 1) + "/bookmarkUsers");
    const handleClick = (event) => {
        if (!auth.currentUser) {
            setTopMsg("Please sign in to have the ability to bookmark.");
        }
        else {
            runTransaction(productBookmarkUsersRef, (productBookmarkUsers) => {
                let newBookmarkUsers = []
                if (productBookmarkUsers) {
                    if (bookmarkStatus) {
                        // remove current user from bookmark users
                        newBookmarkUsers = productBookmarkUsers.filter(item => item !== auth.currentUser.userId)
                    } else {
                        // add current user to bookmark users
                        newBookmarkUsers = productBookmarkUsers
                        newBookmarkUsers.push(auth.currentUser.userId)
                    }
                } else {
                    // if bookmarkUsers does not exist for product, make one with the user id
                    if (!bookmarkStatus) {
                        newBookmarkUsers = [auth.currentUser.userId]
                    }
                }
                return newBookmarkUsers
            })
            .then(() => {
                setBookmarkStatus(!bookmarkStatus)
            })

            .catch((error) => {
                <ErrorScreen error={error} />
            })
        }
    }

    if (bookmarkStatus === true) {
        buttonText = "Bookmarked";
    }

    if (currentProduct.category === "brands") {
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
                            <h3>{topMsg}</h3>
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
                            <h3>{topMsg}</h3>
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
    if(urlParams.id > 17) {
        return (
            <div>
                <p className='card-container'>We are working on finding locations, come back at a later date when we find its location!</p>
            </div>
        )
    }
    else {
    const currentAvailability = AVAILABILITY.filter((data) => (data.productId == urlParams.id));
    const position = [37.7749, -122.4194];
    const mappedCurrentAvailability = currentAvailability.map(location => (
        <Marker
            key={location.id}
            position={[location.gps.latitude, location.gps.longitude]}>
        </Marker>))
        return (
            <div id="map">
                <h2>Product Availability: </h2>
                <div className="map-container">
                    <MapContainer center={position} zoom={3} scrollWheelZoom={true}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {mappedCurrentAvailability}
                    </MapContainer>
                </div>
            </div>
        )
   }
}
