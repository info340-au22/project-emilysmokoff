import React, {useState} from 'react';

//import { BookmarkedBody } from './components/BookmarkedBody.js';
//import { SearchBody } from './components/SearchBody.js';
import { NavigationBar } from './components/NavigationBar.js';
import { HomePage } from './components/HomePage.js';
import { Footer } from './components/Footer.js';


import PRODUCT_LIST from './data/products.json';

export default function App(props) {
    const [productList, setProduct] = useState(PRODUCT_LIST);
    const currentPage = "HomePage";

    return (
        <div>
            <NavigationBar currentPage={currentPage}/>
            <HomePage />
            {/* <BookmarkedBody 
             productList={productList}
            /> */}
            {/* <SearchBody
            productList={productList}
            /> */}
            <Footer currentPage={currentPage} />
        </div>

    )
  }
