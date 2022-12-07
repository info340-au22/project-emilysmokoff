import React from 'react';

import { useParams } from 'react-router-dom';

import { Results } from './Results';
import { SearchForm } from './SearchForm';

export function SearchPage(props) {
    const urlParams = useParams();
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
                productCategory={urlParams.category}
                />
            </div>
        </div>
    )
}