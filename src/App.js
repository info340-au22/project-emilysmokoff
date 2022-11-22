import React, { useState } from 'react';

import { NavigationBar } from './components/NavigationBar.js';
import { HomePage } from './components/HomePage.js';
import { BookmarkedPage } from './components/BookmarkedPage.js';
import { ProductPage } from './components/Product.js';
import { SearchPage } from './components/SearchPage.js';
import { RequestForm, RequestReceipt } from './/components/RequestForm.js';

import { CreateAccount, SignOut, SignIn } from './/components/ProfileForm.js';
import { Footer } from './components/Footer.js';


import PRODUCT_LIST from './data/products.json';

export default function App(props) {

    //Change quotes to HomePage, BookmarkedProducts, BrowsePage depending on page
    const currentPage = "BrowsePage";
    

    //Uncomment for BookmarkedPage
    const [bookmarkedList, setBookmarkedList] = useState(PRODUCT_LIST);


    //Uncomment for SearchPage
    const [searchValue, setSearchValue] = useState('');

    function applyFilter(text) {
        setSearchValue(text);
    }

    let displayedList = PRODUCT_LIST.filter((product) => {
        if (searchValue === '') {
            return product;
        } else {
            if (product.tags.includes(searchValue)) {
                return product;
            } else {
                return null;
            }
        }
    })

    return (
        <div>
            <NavigationBar currentPage={currentPage} />
            {/* <HomePage /> */}
            {/* <BookmarkedPage 
             productList={bookmarkedList}
            /> */}
            {/* <SearchPage
                productList={displayedList}
                applyFilterCallback={applyFilter}
            /> */}
            {/* <RequestForm /> */}
            <CreateAccount />
            {/* <SignIn 
            username="test"
            password="test"
            /> */}
            {/* <SignOut 
            username="test" 
            /> */}
            {/* <RequestReceipt 
            productObj = {PRODUCT_LIST[0]}
            /> */}
            {/* <ProductPage /> */}
            <Footer currentPage={currentPage} />
        </div>

    )
}