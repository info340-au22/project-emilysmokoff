import React from 'react';

import { Link } from 'react-router-dom';
import { Results } from './Results';
import { getAuth } from 'firebase/auth'

export function BookmarkedPage(props) {
    const auth = getAuth();
    const resultsPerUser = props.productList.filter(item => (item.bookmarkUsers && item.bookmarkUsers.includes(auth.currentUser.userId)));
    return (
        <div>
            <div className='search-header'>
                <div className='search-h2'>Your Bookmarked Products <Link className="add" to="/BrowsePage">+ Add Items</Link><span className="plus-icon">+</span></div>
            </div>
            <div className='bookmarked'>
                <Results
                    productList={resultsPerUser}
                />
            </div>
        </div>
    )
}