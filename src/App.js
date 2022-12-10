import React, { useState, useEffect } from 'react';

import { Routes, Route, useLocation, Outlet, Navigate, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth'


import { NavigationBar } from './components/NavigationBar.js';
import { HomePage } from './components/HomePage.js';
import { BookmarkedPage } from './components/BookmarkedPage.js';
import { ProductPage } from './components/Product.js';
import { SearchPage } from './components/SearchPage.js';
import { RequestForm, RequestReceipt } from './/components/RequestForm.js';

import { UserProfile , SignIn } from './/components/ProfileForm.js';
import { Footer } from './components/Footer.js';


import PRODUCT_LIST from './data/products.json';
import { onAuthStateChanged } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';


export default function App(props) {

    const location = useLocation();
    const auth = getAuth();
    const [currentUser, loading, error] = useAuthState(auth);
    
    //Uncomment for SearchPage
    const [searchValue, setSearchValue] = useState('');
    // const [currentUser, setCurrentUser] = useState({"userId": null, "userName": "Log Out", "userImg": "/img/null.png"})
    //const [currentUser, setCurrentUser] = useState("");
    const navigate = useNavigate();

    if (loading) {
        return <p>Initializing user</p>
    }

    if (currentUser) {
        currentUser.userId = currentUser.uid;
        currentUser.userName = currentUser.displayName;
        currentUser.userImg = currentUser.photoURL || "/img/null.png";
        // setCurrentUser(user);
        // setCurrentUser({"userId": user.uid, "userName": user.displayName, "userImg": user.photoURL || "/img/null.png"})
    } else {
        // navigate("SignIn");
        // setCurrentUser({"userId": null, "userName": "Log Out", "userImg": "/img/null.png"});
    }

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




    // useEffect(() =>{
    //     onAuthStateChanged(auth, (firebaseUser) => {
    //         if (firebaseUser) {
    //             firebaseUser.userId = firebaseUser.uid;
    //             firebaseUser.userName = firebaseUser.displayName;
    //             firebaseUser.userImg = firebaseUser.photoURL || "/img/null.png";
    //             setCurrentUser(firebaseUser);
    //         } else {
    //             //setCurrentUser(null);
    //             setCurrentUser({"userId": null, "userName": "Log Out", "userImg": "/img/null.png"});
    //             navigate("SignIn");
    //         }
    //     })


    // }, [])


    return (
        
        <div className="page-content">

            <NavigationBar currentUser={currentUser} applyFilterCallback={applyFilter}/>

            <Routes>

                <Route path="/" element={<HomePage currentUser={currentUser} applyFilterCallback={applyFilter} />} />

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
                    <Route path="UserProfile" element={<UserProfile 
                        currentUser={currentUser} />}
                    />
                </Route>
                <Route path="BrowsePage" element={
                    <SearchPage
                    productList={displayedList}
                    applyFilterCallback={applyFilter} />
                } />
                <Route path="BrowsePage/:category" element={<SearchPage
                    applyFilterCallback={applyFilter} />}
                />
                <Route path="SignIn" element={<SignIn 
                    currentUser={currentUser}/>} 
                />

                <Route path="ProductPage/:id" element={<ProductPage />} />

            </Routes>

            <Footer currentPage={location.pathname} />
        </div>

    )
}

function ProtectedPage(props) {
    if (props.currentUser === null) {
        return <Navigate to="/SignIn" />
    } else {
        return <Outlet />
    }
}