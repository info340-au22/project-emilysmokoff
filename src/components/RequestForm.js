import React from 'react';

export function RequestForm(props) {
    return(
        <div>
            <h2 className="text-center request-header">Request a Product</h2>
            <form>
                <p className="text-center">This is a form to requst a product to appear on our website.</p>
                <p className="text-center">We will assign sustanability ratings and pricing information before publishing your submission.</p>
                <label className="label-text" for="product-name">Product Name:</label><br />
                <input id="product-name" type="text" name="product-name" /><br />
                <label className="label-text" for="company-name">Company Name:</label><br />
                <input id="company-name" type="text" name="company-name" /><br />
                {/* <label className="label-text" for="ingredients">Ingredient Information:</label><br />
                <textarea id="ingredients" name="ingredients" rows="4" cols="50"></textarea><br /> */}
                <label className="label-text" for="filename">Upload Product Photo:</label><br />
                <input type="file" id="filename" name="filename" className="btn btn-primary label-text" /><br /><br />
                <input id="submit" type="submit" value="Submit" className="btn btn-primary label-text mb-4" />
            </form>
        </div>
    );
}

export function RequestReceipt (props) {
    return (
        <div class="text-center">
            <h2 className="request-header">Your Receipt</h2>
            <p>You just submitted this product for review:</p>
            <p>Product Name: {props.productObj.product} </p>
            <p>Company Name: {props.productObj.company} </p>
            <img className="product-img w-25 p-3" src={props.productObj.image}/>
            <p>Thanks for submitting!</p>
        </div>
    )
}