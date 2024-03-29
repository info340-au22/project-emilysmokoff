import React from 'react';
import { Link } from 'react-router-dom';

export function Results(props) {
    const productsDiv = props.productList.map((productData) => {
        let productPage = "/ProductPage/" + productData.id;
        return (
            <div className="card" key={productData.id}>
                <img className="bookmark-search-img" src={productData.image} alt={productData.imageAlt} />
                <p className="product-name">{productData.product}</p>
                <p className="company">{productData.company}<span className="price">{productData.price}</span></p>
                <img className="rating" src={productData.ratingImage} alt={productData.ratingImageAlt} />
                <Link to={productPage}><p className="shop-now">View Product</p></Link>
            </div>
        )
    } //link to specific product here
    )

    if (productsDiv.length === 0) {
        if (props.page === 'search') {
            return (
                <div className='no-results'>
                    <p className='card-container'>No results found. Please try again! </p>
                    <Link className='search-page-request' to="/RequestProduct">Click here to request a product</Link>
                </div>
            );
        } else {
            return (
                <div className='no-results'>
                    <p className='card-container'>You have not bookmarked any products yet! </p>
                    <Link className='search-page-request' to="/BrowsePage">Click here to browse products</Link>
                </div>
            );
        }
    } else {
        return (
            <main>
                <div className='card-container'>{productsDiv}</div>
            </main>
        )
    }
}
