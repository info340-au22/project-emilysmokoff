import React, { useState } from 'react';

import { Routes, Route, useLocation } from 'react-router-dom';

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
        
        <div className="page-content">

            <NavigationBar />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="BookmarkedProducts" element={<BookmarkedPage 
                    productList={PRODUCT_LIST} />} 
                />
                <Route path="BrowsePage" element={<SearchPage
                    productList={displayedList}
                    applyFilterCallback={applyFilter} />}
                />
                <Route path="RequestProduct/*" element={<RequestForm />} />
                <Route path="CreateAccount" element={<CreateAccount />} />
                <Route path="SignIn" element={<SignIn 
                    username="test"
                    password="test" />} 
                />
                <Route path="SignOut" element={<SignOut 
                    username="test" />}
                />
                <Route path="RequestProductReceipt" element={<RequestReceipt 
                    productObj = {PRODUCT_LIST[0]} />} 
                />
                <Route path="ProductPage" element={<ProductPage />} />
            </Routes>

            <Footer currentPage={useLocation().pathname} />
        </div>

    )
}