import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDatabase, ref as dbRef, set as firebaseSet, onValue, update as firebaseUpdate } from 'firebase/database';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { ErrorScreen } from './ApproveProduct.js';
import { AdminRequest } from './AdminRequest.js';

export function RequestForm(props) {
    const [prodName, setProdName] = useState("");
    const [comName, setComName] = useState("");
    const [prodImg, setProdImg] = useState(undefined);
    const [imgURL, setImgURL] = useState("");

    const [topMsg, setTopMsg] = useState(""); 

    const db = getDatabase();

    const [fullProductArray, setFullProductArray] = useState([]);
    const [ranProductList, setRanProductList] = useState(false);
    
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

            setFullProductArray(productArray);

        });
    }, []);

    const key = fullProductArray.length;
    const id = fullProductArray.length + 1;

    const navigate = useNavigate();

    const handleClick = async (event) => {
        event.preventDefault();

        if (prodName === "" || comName === "") {
            setTopMsg("Please fill out all fields!");
        } else {
            const newIdRef = dbRef(db, "products/" + key);
            firebaseSet(newIdRef, key)
            .then(() => {
                firebaseSet(newIdRef, {
                    product: prodName,
                    company: comName,
                    id: id,
                    approval: "unapproved",
                })
                .then(() => {
                    handleImageUpload(event);
                    navigate("/RequestProductReceipt/" + key);
                })
                .catch((error) => {
                    <ErrorScreen error={error} />
                })
            })

            .catch((error) => {
                <ErrorScreen error={error} />
            })
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
        const imgTitle = "requestImages/" + props.currentUser.userName + " - product: " + prodName + ", company: " + comName + ".png"
        const imageRef = ref(storage, imgTitle);
        await uploadBytes(imageRef, prodImg);
        const downloadUrlString = await getDownloadURL(imageRef);
        const newIdRef = dbRef(db, "products/" + key);
        firebaseUpdate(newIdRef, {
            imgUrl: imgURL,
            image: downloadUrlString
        })

        .catch((error) => {
            <ErrorScreen error={error} />
        })
    }
    if(props.currentUser.userName === "Admin") {
        return (
            <AdminRequest />
        );
    }
    else if (ranProductList === false) {
        return (
            <div className='no-results'>
                <p className='card-container'>Loading your page!</p>
            </div>
        )
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
    const urlParams = useParams();
    const objKey = urlParams.ProductId;

    useEffect(() => {

        const db = getDatabase();
        const prodRef = dbRef(db, "products/" + objKey + "/product");
        const comRef = dbRef(db, "products/" + objKey + "/company");
        const imgRef = dbRef(db, "products/" + objKey + "/image");

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
            <p>If you do not see your image below yet, please WAIT for it to upload before navigating off the page. We are working on adding it to our database.</p>
            <img src={imgRef} className="w-25 p-3" alt={prodName} />
            <p>Thanks for submitting!</p>
        </div>
    )
}