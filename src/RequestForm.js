import React from 'react';

export function RequestForm(props) {
    <div>
        <h2 class="text-center request-header">Request a Product</h2>
        <form>
            <p class="text-center">This is a form to requst a product to appear on our website.</p>
            <p class="text-center">We will assign sustanability ratings and pricing information before publishing your submission.</p>
            <label class="label-text" for="product-name">Product Name:</label><br />
            <input id="product-name" type="text" name="product-name" /><br />
            <label class="label-text" for="company-name">Company Name:</label><br />
            <input id="company-name" type="text" name="company-name" /><br />
            <label class="label-text" for="ingredients">Ingredient Information:</label><br />
            <textarea id="ingredients" name="ingredients" rows="4" cols="50"></textarea><br />
            <label class="label-text" for="filename">Upload Product Photo:</label><br />
            <input type="file" id="filename" name="filename" class="btn btn-primary label-text" /><br /><br />
            <input id="submit" type="submit" value="Submit" class="btn btn-primary label-text" />
        </form>
    </div>
}