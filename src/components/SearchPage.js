import React from 'react';
//import { getDatabase, ref as dbRef, onValue  } from 'firebase/database';

import { Results } from './Results';
import { SearchForm } from './SearchForm';

export function SearchPage(props) {
    // const db = getDatabase();

    // const productRef = dbRef(db, "products");

    // const [approvedProductArray, setApprovedProductArray] = useState([]);
    // const [ranProductList, setRanProductList] = useState(false);
    
    // useEffect(() => {
    //     onValue(productRef, (snapshot) => {
    //         const productArray = [];
    //         setRanProductList(true);
    //         snapshot.forEach((product) => {
    //             const productData = product.val();
    //             productArray.push(productData);
    //         });

            // const filteredArray = productArray.filter((value) => {
            //     if(value.approval === "unapproved") {
            //         return value;
            //     }
            // });
            // setApprovedProductArray(filteredArray);


    //     });
    // }, []);

    // add this clause to tell users the pages content is loading, or else weird errors and results happen
    // if (ranProductList == false) {
    //     return (
    //         <div className='no-results'>
    //             <p className='card-container'>Loading your page!</p>
    //         </div>
    //     )
    // }
    //wrap the return statement in this else bracket (I commented out the closing bracket below)
    // else {

    return (
        <div>
            <div className='search-header'>
                <div className='search-h2'>Browse Products</div>
            </div>
            <div className='bookmarked'>
                <SearchForm
                applyFilterCallback={props.applyFilterCallback}
                />
                <Results
                productList={props.productList}
                />
            </div>
        </div>
    )
    //}
}