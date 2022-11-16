import React, {useState} from 'react';

export function SearchBody(props) {
    const productsArray = props.productList.map((productObj) => {
        const element = (
            <ProductItem 
            productData={productObj} 
            key={productObj.id} 
            />
        )
        return element;
    })
    return (
    <div>
        <div className='search-header'>
            <div className='h2'>Search</div>
        </div>
        <form className="search-page-form">
            <input className="search-page-bar" id="search-input" type="text" name="search"
                placeholder=" Search for products, categories, ..."/>
            <span id="search-icon" className="material-icons" aria-label="search icon">search</span>
        </form>
        {productsArray}
    </div>
    )
}
    
function ProductItem(props){
    const {product, company, price, image, imageAlt, ratingImage, ratingImageAlt} = props.productData;

    return (  
        <div className='bookmarked'>
            <main> 
                <div className="card-container">
                    <div className="card">
                        <img className="product-img" src={image} alt={imageAlt}/>
                        <p className="product-name">{product}</p>
                        <p className="company">{company}<span className="price">{price}</span></p>
                        <img className="rating" src={ratingImage} alt={ratingImageAlt}/>
                        <a href="product_page.html"><p className="shop-now">Shop Now</p></a>
                    </div>
                </div>
            </main>
        </div>
    )
}