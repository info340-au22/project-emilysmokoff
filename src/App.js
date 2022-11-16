import React, {useState} from 'react';

import { BookmarkedBody } from './BookmarkedBody.js';
import { SearchBody } from './SearchBody.js';

import PRODUCT_LIST from './data/products.json';

export default function App(props) {
    const [productList, setProduct] = useState(PRODUCT_LIST);

    return (
        // <BookmarkedBody 
        //     productList={productList}
        // />
        // <SearchBody
        // productList={productList}
        // />
    )
  }
