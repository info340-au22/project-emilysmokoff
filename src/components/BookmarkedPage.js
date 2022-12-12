import React from 'react';

import { Link } from 'react-router-dom';
import { Results } from './Results';
import { getAuth } from 'firebase/auth'

export function BookmarkedPage(props) {
    const auth = getAuth();
    const resultsPerUser = props.productList.filter(item => (item.bookmarkUsers && item.bookmarkUsers.includes(auth.currentUser.userId)));
    return (
        <div>
            <div className='search-bookmark-header'>
                <div className='search-bookmark-h2'>Your Bookmarked Products <Link className="add" to="/BrowsePage">+ Add Items</Link><Link to="/BrowsePage" className="plus-icon">+</Link></div>
            </div>
            <div className='bookmarked'>
                <Results
                    productList={resultsPerUser}
                />
            </div>
        </div>
    )
}