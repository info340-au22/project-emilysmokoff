import React, {useState} from 'react';
import { Results } from './Results';
import { SearchForm } from './SearchForm';

export function SearchPage(props) {
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
}