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
    const currentPage = "SearchPage";

    const[searchValue, setSearchValue] = useState('');

    function applyFilter(text){
        setSearchValue(text);
      }

    let displayedListSearch = productListSearch.filter((product) => {
        if(searchValue==''){
            return product
        }
        if(product.product.includes(searchValue)){
            return product;
        }
    }
    
    )

    return (
        <div>
            <NavigationBar currentPage={currentPage}/>
            {/* <HomePage /> */}
            {/* <BookmarkedBody 
             productList={productList}
            /> */}
            <SearchBar
                applyFilterCallback={applyFilter}
            />
            <SearchBody
                productList={displayedListSearch}
            />
            <Footer currentPage={currentPage} />
        </div>

    )
  }
