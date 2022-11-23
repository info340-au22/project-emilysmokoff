import React from 'react';
import { Results } from './Results';

export function BookmarkedPage(props) {
    return (
        <div>
            <div className='search-header'>
                <div className='search-h2'>Your Bookmarked Products <span className="add">+ Add Items</span><span className="plus-icon">+</span></div>
            </div>
            <div className='bookmarked'>
                <Results
                    productList={props.productList}
                />
            </div>
        </div>
    )
}