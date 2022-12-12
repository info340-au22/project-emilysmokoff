import React from 'react';

import { Results } from './Results';
import { SearchForm } from './SearchForm';

export function SearchPage(props) {

    // add this clause to tell users the pages content is loading, or else weird errors and results happen
    if (props.ranProductList === false) {
        return (
            <div className='no-results'>
                <p className='card-container'>Loading your page!</p>
            </div>
        )
    }
    // wrap the return statement in this else bracket (I commented out the closing bracket below)
    else {
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
                    page={'search'}
                    />
                </div>
            </div>
        )
    }
}