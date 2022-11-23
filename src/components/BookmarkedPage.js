import React from 'react';

import { Link } from 'react-router-dom';
import { Results } from './Results';

export function BookmarkedPage(props) {
    return (
        <div>
            <div className='search-header'>
                <div className='search-h2'>Your Bookmarked Products <Link className="add" to="/BrowsePage">+ Add Items</Link><span className="plus-icon">+</span></div>
            </div>
            <div className='bookmarked'>
                <Results
                    productList={props.productList}
                />
            </div>
        </div>
    )
}