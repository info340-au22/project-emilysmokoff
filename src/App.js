import React, { useState, useEffect } from 'react';
import { getDatabase, ref as dbRef, onValue  } from 'firebase/database';

import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth'

import { NavigationBar } from './components/NavigationBar.js';
import { HomePage } from './components/HomePage.js';
import { BookmarkedPage } from './components/BookmarkedPage.js';
import { ProductPage } from './components/Product.js';
import { SearchPage } from './components/SearchPage.js';
import { RequestForm, RequestReceipt } from './/components/RequestForm.js';
import { ApproveProduct, ApprovalScreen, DenialScreen } from './components/ApproveProduct.js';
import { PageDoesNotExist } from './components/PageDoesNotExist';

import { UserProfile , SignIn } from './/components/ProfileForm.js';
import { Footer } from './components/Footer.js';

import { useAuthState } from 'react-firebase-hooks/auth';

export default function App(props) {

    const [ranProductList, setRanProductList] = useState(false);
    const [approvedProductArray, setApprovedProductArray] = useState([]);
    
    useEffect(() => {
        const db = getDatabase();
        const productRef = dbRef(db, "products");
        
        onValue(productRef, (snapshot) => {
            const productArray = [];
            setRanProductList(true);
            snapshot.forEach((product) => {
                const productData = product.val();
                productArray.push(productData);
            });

            const filteredArray = productArray.filter((value) => {
                if(value.approval === "approved") {
                    return true;
                }
                return false;
            });
            setApprovedProductArray(filteredArray);
        });
    }, []);

    const [searchValue, setSearchValue] = useState('');

    function applyFilter(text) {
        setSearchValue(text);
    }

    let displayedList = approvedProductArray.filter((product) => {
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

    function setState (nullValue){
        setSearchValue(nullValue);
    }

    const auth = getAuth();
    const [currentUser, loading] = useAuthState(auth);

    if (loading) {
        return <p>Loading Information</p>
    }

    if (currentUser) {
        currentUser.userId = currentUser.uid;
        currentUser.userName = currentUser.displayName;
        currentUser.userImg = currentUser.photoURL || "/img/null.png";
    }
    
    return (
        <div className="page-content">
            <NavigationBar currentUser={currentUser} applyFilterCallback={applyFilter} setStateCallback={setState} />
            <div className="route-choice">
                <Routes>

                    <Route path="/" element={<HomePage 
                    currentUser={currentUser} 
                    applyFilterCallback={applyFilter} 
                    /> } />

                    <Route element={<ProtectedPage currentUser={currentUser} />}>
                        <Route path="BookmarkedProducts" element={<BookmarkedPage 
                            productList={displayedList} />} 
                        />
                        <Route path="RequestProduct" element={<RequestForm 
                            currentUser={currentUser} /> }
                        />
                        <Route path="RequestProductReceipt/:ProductId" element={<RequestReceipt  />} />
                        <Route path="UserProfile" element={<UserProfile 
                            currentUser={currentUser} />}
                        />
                    </Route>
                    <Route path="BrowsePage" element={
                        <SearchPage
                        productList={displayedList}
                        ranProductList={ranProductList}
                        applyFilterCallback={applyFilter} />
                    } />
                    <Route path="SignIn" element={<SignIn 
                        currentUser={currentUser}/>} 
                    />
                    <Route path="*" element={<PageDoesNotExist />} />

                    <Route path="ProductPage/:id" element={<ProductPage />} />
                    <Route path="ApproveProduct/:productId" element={<ApproveProduct />} />
                    <Route path="ApprovalScreen" element={<ApprovalScreen />} />
                    <Route path="DenialScreen" element={<DenialScreen />} />

                </Routes>
            </div>
            <Footer />
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