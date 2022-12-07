import React from 'react';
import { Link } from 'react-router-dom';

import PRODUCTS from '../data/products.json';

export function Results(props) {
    const productsDiv = PRODUCTS.map((productData) => {
        if((productData.category == props.productCategory) || (props.productCategory == null)) {
            let productPage = "/ProductPage/" + productData.id;
            if(productData.category == "brands") {
                return (
                    <div className="card" key={productData.id}>
                        <img className="bookmark-search-img" src={productData.image} alt={productData.imageAlt}/>
                        <p className="product-name">{productData.product}</p>
                        <p className="company">{productData.company}</p>
                        <img className="rating" src={productData.ratingImage} alt={productData.ratingImageAlt}/>
                        <Link to={productPage}><p className="shop-now">Shop Now</p></Link> 
                    </div>
                )
            }
            else {
                return(
                    <div className="card" key={productData.id}>
                        <img className="bookmark-search-img" src={productData.image} alt={productData.imageAlt}/>
                        <p className="product-name">{productData.product}</p>
                        <p className="company">{productData.company}<span className="price">{productData.price}</span></p>
                        <img className="rating" src={productData.ratingImage} alt={productData.ratingImageAlt}/>
                        <Link to={productPage}><p className="shop-now">Shop Now</p></Link> 
                    </div>
            )}
        }
    })
    if(productsDiv==null){
        return (
            <p className='card-container'>No results found. Please try again! </p>
            //link to request product page
        );
    }
    else{
        return (
            <main>
                <div className='card-container'>{productsDiv}</div>
            </main>
        )
    }
}
