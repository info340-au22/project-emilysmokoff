import React from 'react';
import currentProductData from '../data/productData.json'

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
    return (
        <div class="map-card">
                <h3>Availability near me</h3>
                <p><button>Show availibility on maps</button></p>
                <img className="map-img" src={"../img/map.jpeg"} alt={currentProductData.imageAlt} />
        </div>
    )
}

