import React from 'react';
import { Link } from 'react-router-dom';

export function PageDoesNotExist(props) {
    return(
        <div>
                <h3 className='card-container'>Page Does not Exist!</h3>
            <Link to="/">Go Back to Home Page.</Link>
        </div>
    )
}