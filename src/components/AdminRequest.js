import React, { useState, useEffect } from 'react';
import { getDatabase, ref as dbRef, set as firebaseSet, onValue  } from 'firebase/database';
import { Link } from 'react-router-dom';

import { ApproveProduct } from './ApproveProduct.js';

export function AdminRequest(props) {
    const db = getDatabase();
    const productRef = dbRef(db, "products");

    const productArray = [];
    const [productsToApprove, setProductsToApprove] = useState([]);
    const [ranProductList, setRanProductList] = useState(false);
    

    useEffect(() => {
        onValue(productRef, (snapshot) => {
            setRanProductList(true);
            snapshot.forEach((product) => {
                const productData = product.val();
                productArray.push(productData);
            });
            
            const filteredArray = productArray.filter((value) => {
                if(value.approval === "unapproved") {
                    return value;
                }
            });

            setProductsToApprove(filteredArray.map((value) => {
                    if(value.approval === "unapproved") {
                        let returnRoute = "/ApproveProduct/" + (value.id - 1);
                        return(
                            <div className="card" key={value.image}>
                                <img className="bookmark-search-img" src={value.image} />
                                <p className="product-name">{value.product}</p>
                                <p className="company">{value.company}</p>
                                <Link to={returnRoute} ><p className="shop-now">Product Approval</p></Link>
                            </div>
                    )}
                })
            );
        });
    }, []);

    if(productsToApprove[0] == null && ranProductList == true){
        return (
            <div className='no-results'>
                <p className='card-container'>There are no new products to approve. </p>
            </div>
        );
    }
    else if(ranProductList == false) {
        return (
            <div className='no-results'>
                <p className='card-container'>We are loading any possible products.</p>
            </div>
        );
    }
    else{
        return (
            <main>
                <h2>Here are your possible products to approve!</h2>
                <div className="define-spacing">
                    <div className='card-container'>{productsToApprove}</div>
                </div>
            </main>
        )
    }
}