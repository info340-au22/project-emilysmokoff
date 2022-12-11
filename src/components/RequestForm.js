import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import firebase from 'firebase/app';
import { getDatabase, ref as dbRef, set as firebaseSet, onValue  } from 'firebase/database';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { AdminRequest } from './AdminRequest.js';

export function RequestForm(props) {
    const [prodName, setProdName] = useState("");
    const [comName, setComName] = useState("");
    const [prodImg, setProdImg] = useState(undefined);
    const [imgURL, setImgURL] = useState("");


    const [topMsg, setTopMsg] = useState(""); 

        
    const db = getDatabase();

    //let topMsg = "";

    const navigate = useNavigate();

    const handleClick = async (event) => {
        event.preventDefault();

        if (prodName == "" || comName == "") {
            setTopMsg("Please fill out all fields!");
        } else {
            const prodRef = dbRef(db, "prodName");
            firebaseSet(prodRef, prodName);
            const comRef = dbRef(db, "comName");
            firebaseSet(comRef, comName);
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
            handleImageUpload(event);
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
        if (event.target.files.length > 0 && event.target.files[0]) {
            const imageFile = event.target.files[0];
            setProdImg(imageFile);
            setImgURL(URL.createObjectURL(imageFile))
        }
    }

    const handleImageUpload = async (event) => {
        const storage = getStorage();
        const requestRef = dbRef(db, "imgUrl");
        firebaseSet(requestRef, imgURL);
        const imgTitle = "requestImages/" + props.currentUser.userName + " - product: " + prodName + ", company: " + comName + ".png"
        const imageRef = ref(storage, imgTitle);
        await uploadBytes(imageRef, prodImg)
        const downloadUrlString = await getDownloadURL(imageRef)
        const imgTitleRef = dbRef(db, "downloadUrlString");
        firebaseSet(imgTitleRef, downloadUrlString);
    }

    if(props.currentUser.userName == "Admin") {
        return (
            <AdminRequest />
        );
    }
    else {
        return(
            <div>
                <p className="text-center mt-5">{topMsg}</p>
                <h2 className="text-center request-header">Request a Product</h2>
                <form>
                    <p className="text-center">This is a form to requst a product to appear on our website.</p>
                    <p className="text-center">We will assign sustanability ratings and pricing information before publishing your submission.</p>
                    <label className="label-text" htmlFor="product-name">Product Name:</label><br />
                    <input id="product-name" value={prodName} type="text" onChange={handleChange} name="productName" /><br /><br />
                    <label className="label-text" htmlFor="company-name">Company Name:</label><br />
                    <input id="company-name" value={comName} type="text" onChange={handleChange2} name="companyName"/><br /><br />
                    {/* <label className="label-text" for="ingredients">Ingredient Information:</label><br />
                    <textarea id="ingredients" name="ingredients" rows="4" cols="50"></textarea><br /> */}
                    <label className="label-text" htmlFor="filename">Upload Product Photo:</label><br />
                    <input type="file" id="filename" onChange={handleChange3} name="filename" className="btn btn-success label-text" /><br /><br />
                    <input id="submit" type="submit" value="Submit" className="btn btn-success label-text mb-4" to="/RequestProductReceipt" onClick={handleClick}/>
                </form>
            </div>
        );
     }
}

export function RequestReceipt (props) {

    const [prodName, setProdName] = useState("");
    const [comName, setComName] = useState("");
    const [imgRef, setImgRef] = useState("");

    useEffect(() => {

        const db = getDatabase();
        const prodRef = dbRef(db, "prodName");
        const comRef = dbRef(db, "comName");
        const imgRef = dbRef(db, "downloadUrlString")

        onValue(prodRef, (snapshot) => {
            const newValue = snapshot.val();
            setProdName([newValue])
        });

        onValue(comRef, (snapshot) => {
            const newValue = snapshot.val();
            setComName([newValue])
        });

        onValue(imgRef, (snapshot) => {
            const newValue = snapshot.val();
            setImgRef([newValue])
        });

    }, [])

    return (
        <div className="text-center">
            <h2 className="request-header">Your Receipt</h2>
            <p>You just submitted this product for review:</p>
            <p>Product Name: {prodName} </p>
            <p>Company Name: {comName} </p>
            <img src={imgRef} className="w-25 p-3" />
            <p>Thanks for submitting!</p>
        </div>
    )
}