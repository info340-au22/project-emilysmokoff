import React, { useState, useEffect } from 'react';

import { Routes, Route, useLocation, Outlet, Navigate, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth'


import { NavigationBar } from './components/NavigationBar.js';
import { HomePage } from './components/HomePage.js';
import { BookmarkedPage } from './components/BookmarkedPage.js';
import { ProductPage } from './components/Product.js';
import { SearchPage } from './components/SearchPage.js';
import { RequestForm, RequestReceipt } from './/components/RequestForm.js';

import { SignOut, SignIn } from './/components/ProfileForm.js';
import { Footer } from './components/Footer.js';


import PRODUCT_LIST from './data/products.json';
import { onAuthStateChanged } from 'firebase/auth';

export default function App(props) {
    
    //Uncomment for SearchPage
    const [searchValue, setSearchValue] = useState('');
    const [currentUser, setCurrentUser] = useState({"userId": null, "userName": "Log Out", "userImg": "/img/null.png"})
    const navigate = useNavigate();

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


    useEffect(() =>{
        const auth = getAuth();
        onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                firebaseUser.userId = firebaseUser.uid;
                firebaseUser.userName = firebaseUser.displayName;
                firebaseUser.userImg = firebaseUser.photoURL || "/img/null.png";
                setCurrentUser(firebaseUser);
            } else {
                navigate("SignIn");
                setCurrentUser({"userId": null, "userName": "Log Out", "userImg": "/img/null.png"});
            }
        })
    }, [])


    return (
        
        <div className="page-content">

            <NavigationBar currentUser={currentUser} />

            <Routes>
                <Route path="/" element={<HomePage />} />

                <Route element={<ProtectedPage currentUser={currentUser} />}>
                    <Route path="BookmarkedProducts" element={<BookmarkedPage 
                        productList={PRODUCT_LIST} />} 
                    />
                    <Route path="RequestProduct" element={<RequestForm 
                        currentUser={currentUser} />}
                     />
                    <Route path="RequestProductReceipt" element={<RequestReceipt 
                        productObj = {PRODUCT_LIST[0]} />} 
                    />
                </Route>
                <Route path="BrowsePage" element={
                    <SearchPage
                    applyFilterCallback={applyFilter} />
                } />
                <Route path="BrowsePage/:category" element={<SearchPage
                    applyFilterCallback={applyFilter} />}
                />
                <Route path="SignIn" element={<SignIn 
                    currentUser={currentUser}/>} 
                />
                <Route path="SignOut" element={<SignOut 
                    currentUser={currentUser} />}
                />
                <Route path="ProductPage/:id" element={<ProductPage />} />
            </Routes>

            <Footer currentPage={useLocation().pathname} />
        </div>

    )
}

function ProtectedPage(props) {
    if (props.currentUser.userId === null) {
        return <Navigate to="/SignIn" />
    } else {
        return <Outlet />
    }
}