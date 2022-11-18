import React, {useState} from 'react';

//import { BookmarkedBody } from './components/BookmarkedBody.js';
import { SearchBar } from './components/SearchBar.js';
import { SearchBody } from './components/SearchBody.js';
import { NavigationBar } from './components/NavigationBar.js';
//import { HomePage } from './components/HomePage.js';
import { Footer } from './components/Footer.js';


import PRODUCT_LIST from './data/products.json';

export default function App(props) {
//    const [productList, setProductList] = useState(PRODUCT_LIST);
    const [productListSearch, setProductListSearch] = useState(PRODUCT_LIST);
    const currentPage = "BrowsePage";

    const filterProductList = (text) => {
        let filteredProductList = [];
        for(let i=0; i<productListSearch.length; i++){
            let productObj = productListSearch[i];
            if(productObj.product.includes(text)){
                filteredProductList.push(productObj);
            }
        }
        setProductListSearch(filteredProductList);
    }

    return (
        <div>
            <NavigationBar currentPage={currentPage}/>
            {/* <HomePage /> */}
            {/* <BookmarkedBody 
             productList={productList}
            /> */}
            <SearchBar
                productList={productListSearch}
                filterProductList={filterProductList}
            />
            <SearchBody
                productList={productListSearch}
            />
            <Footer currentPage={currentPage} />
        </div>

    )
  }
