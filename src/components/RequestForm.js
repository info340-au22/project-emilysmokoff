import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
//import firebase from 'firebase/app';
import { getDatabase, ref as dbRef, set as firebaseSet, onValue  } from 'firebase/database';
//import { getStorage, ref as storageRef } from "firebase/storage";

export function RequestForm(props) {

    const [prodName, setProdName] = useState("");
    const [comName, setComName] = useState("");
    const [prodImg, setProdImg] = useState("");
    const [topMsg, setTopMsg] = useState(""); 


    
    const db = getDatabase();
    //const storage = getStorage();

    //let topMsg = "";

    const navigate = useNavigate();

    const handleClick = async (event) => {
        event.preventDefault();

        if (prodName == "" || comName == "") {
            console.log("tes");
            setTopMsg("Please fill out all fields!");
        } else {
            const messageRef = dbRef(db, "prodName");
            firebaseSet(messageRef, prodName);
            const messageRef2 = dbRef(db, "comName");
            firebaseSet(messageRef2, comName);
            // const messageRef3 = ref(db, "prodImg");
            // firebaseSet(messageRef3, prodImg);
            // const imgRef = firebase.storage().storageRef();
            // const file = document.querySelector("#filename").files[0];
            // const name = file.name;
            // const metadata = {
            //     contentType:file.type
            // }
            // const task = imgRef.child("name").put(file,metadata);

            // task.then(snapshot) {

            // }

            navigate("/RequestProductReceipt");
        } 
    }

    const handleChange = (event) => {
        setProdName(event.target.value);
    }

    const handleChange2 = (event) => {
        setComName(event.target.value);
    }

    const handleChange3 = (event) => {
        setProdImg(event.target.value);
    }

    
    
    return(
        <div>
            <p className="text-center mt-5">{topMsg}</p>
            <h2 className="text-center request-header">Request a Product</h2>
            <form method="POST" action="https://api.github.com/search/repositories">
                <p className="text-center">This is a form to requst a product to appear on our website.</p>
                <p className="text-center">We will assign sustanability ratings and pricing information before publishing your submission.</p>
                <label className="label-text" htmlFor="product-name">Product Name:</label><br />
                <input id="product-name" value={prodName} type="text" onChange={handleChange} name="productName" /><br /><br />
                <label className="label-text" htmlFor="company-name">Company Name:</label><br />
                <input id="company-name" value={comName} type="text" onChange={handleChange2} name="companyName"/><br /><br />
                {/* <label className="label-text" for="ingredients">Ingredient Information:</label><br />
                <textarea id="ingredients" name="ingredients" rows="4" cols="50"></textarea><br /> */}
                <label className="label-text" htmlFor="filename">Upload Product Photo:</label><br />
                <input type="file" id="filename" value={prodImg} onChange={handleChange3} name="filename" className="btn btn-primary label-text" /><br /><br />
                <input id="submit" type="submit" value="Submit" className="btn btn-primary label-text mb-4" to="/RequestProductReceipt" onClick={handleClick}/>
            </form>
        </div>
    );
}

export function RequestReceipt (props) {

    const [prodName, setProdName] = useState("");
    const [comName, setComName] = useState("");

    useEffect(() => {

        const db = getDatabase();
        const messageRef = dbRef(db, "prodName");
        const messageRef2 = dbRef(db, "comName");
        //const messageRef3 = ref(db, "prodImg");

        onValue(messageRef, (snapshot) => {
            const newValue = snapshot.val();
            setProdName([newValue])
        });

        onValue(messageRef2, (snapshot) => {
            const newValue = snapshot.val();
            setComName([newValue])
        });

    }, [])

    return (
        <div className="text-center">
            <h2 className="request-header">Your Receipt</h2>
            <p>You just submitted this product for review:</p>
            <p>Product Name: {prodName} </p>
            <p>Company Name: {comName} </p>
            {/* <img className="product-img " src={props.productObj.image}/> */}
            <p>Thanks for submitting!</p>
        </div>
    )
}