import React, {useState} from 'react';

//import { BookmarkedBody } from './components/BookmarkedBody.js';
//import { ProductPage } from './components/Product.js';
//import { SearchBody } from './components/SearchBody.js';
import { NavigationBar } from './components/NavigationBar.js';
import { HomePage } from './components/HomePage.js';
import { Footer } from './components/Footer.js';
//import { RequestForm, RequestReceipt } from './/components/RequestForm.js';
import { CreateAccount, SignOut, SignIn } from './/components/ProfileForm.js';


import PRODUCT_LIST from './data/products.json';

export default function App(props) {
    const [productList, setProduct] = useState(PRODUCT_LIST);
    const currentPage = "HomePage";

    return (
        <div>
            <NavigationBar currentPage={currentPage}/>
            <HomePage />
            {/* <BookmarkedBody 
             productList={productList}/> 
             */}
            {/* <SearchBody
            productList={productList}
            /> */}
            {/* <RequestForm /> */}
            {/* <CreateAccount /> */}
            {/* <SignIn 
            username="test"
            password="test"
            /> */}
            {/* <SignOut 
            username="test" 
            /> */}
            {/* <RequestReceipt 
            productObj = {productList[0]}
            /> */}
            {/* <ProductPage /> */}
            <Footer currentPage={currentPage} />
        </div>

    )
  }
