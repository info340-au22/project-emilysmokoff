import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

export function RequestForm(props) {

    const [prodName, setProdName] = useState("x");
    const [comName, setComName] = useState("x"); 

    const handleClick = (event) => {
        event.preventDefault();

        setProdName(event.target.form.productName.value);
        setComName(event.target.form.companyName.value);
        //Route to request receipt
        //<RequestReceipt product = {prodName} company = {comName} />
        <Routes>
            <Route path="RequestProductReceipt" element={<RequestReceipt product = {prodName} company = {comName} />} />
        </Routes>
    }

    let topMsg = "";
    if (prodName == "" || comName == "") {
        topMsg = "Please fill out all fields!"
    }
    
    return(
        <div>
            <p className="text-center mt-5">{topMsg}</p>
            <h2 className="text-center request-header">Request a Product</h2>
            <form method="POST"  action ="/">
                <p className="text-center">This is a form to requst a product to appear on our website.</p>
                <p className="text-center">We will assign sustanability ratings and pricing information before publishing your submission.</p>
                <label className="label-text" htmlFor="product-name">Product Name:</label><br />
                <input id="product-name" type="text" name="productName" /><br /><br />
                <label className="label-text" htmlFor="company-name">Company Name:</label><br />
                <input id="company-name" type="text" name="companyName" /><br /><br />
                {/* <label className="label-text" for="ingredients">Ingredient Information:</label><br />
                <textarea id="ingredients" name="ingredients" rows="4" cols="50"></textarea><br /> */}
                <label className="label-text" htmlFor="filename">Upload Product Photo:</label><br />
                <input type="file" id="filename" name="filename" className="btn btn-primary label-text" /><br /><br />
                <input id="submit" type="submit" value="Submit" className="btn btn-primary label-text mb-4" onClick={handleClick}/>
            </form>
            
        </div>
    );
}

export function RequestReceipt (props) {
    return (
        <div class="text-center">
            <h2 className="request-header">Your Receipt</h2>
            <p>You just submitted this product for review:</p>
            <p>Product Name: {props.product} </p>
            <p>Company Name: {props.company} </p>
            <img className="product-img " src={props.productObj.image}/>
            <p>Thanks for submitting!</p>
        </div>
    )
}