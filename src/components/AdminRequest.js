import React, { useState, useEffect } from 'react';
import { getDatabase, ref as dbRef, onValue  } from 'firebase/database';
import { Link } from 'react-router-dom';


export function AdminRequest(props) {

    const [productsToApprove, setProductsToApprove] = useState([]);
    const [ranProductList, setRanProductList] = useState(false);
    

    useEffect(() => {
        const db = getDatabase();
        const productRef = dbRef(db, "products");

        onValue(productRef, (snapshot) => {
            const productArray = [];
            setRanProductList(true);
            snapshot.forEach((product) => {
                const productData = product.val();
                productArray.push(productData);
            });
            
            const filteredArray = productArray.filter((value) => {
                if(value.approval === "unapproved") {
                    return true;
                }
                return false;
            });

            setProductsToApprove(filteredArray.map((value) => {
                let returnRoute = "/ApproveProduct/" + (value.id - 1);
                return(
                    <div className="card" key={value.product + value.company}>
                        <img className="bookmark-search-img" src={value.image} alt={value.product} />
                        <p className="product-name">{value.product}</p>
                        <p className="company">{value.company}</p>
                        <Link to={returnRoute} ><p className="shop-now">Product Approval</p></Link>
                    </div>
                )
            })
            );
        });
    }, []);

    if(!productsToApprove[0] && ranProductList === true){
        return (
            <div className='no-results'>
                <p className='card-container'>There are no new products to approve. </p>
            </div>
        );
    }
    else if(ranProductList === false) {
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