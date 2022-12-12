import React, { useState, useEffect } from 'react';
import { getDatabase, ref as dbRef, onValue, update as firebaseUpdate  } from 'firebase/database';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useParams, useNavigate } from 'react-router-dom';

export function ApproveProduct (props) {
    //this code set adds products to the database when admin approves them
    const productKey= useParams();
    const db = getDatabase();
    const productRef = dbRef(db, "products/" + productKey.productId);

    //sets all state objects needed to define new database product element
    const [productObject, setProductObject] = useState({});
    const [loadedProduct, setLoadedProduct] = useState(false);
    const [productRating, setProductRating] = useState("");
    const [price, setPrice] = useState("");
    const [imageAlt, setImageAlt] = useState("");
    const [ratingJustification, setRatingJustification] = useState("");
    const [tags, setTags] = useState("");
    const [category, setCategory] = useState("");
    const [link, setLink] = useState("");
    const [ratingImgAlt, setratingImgAlt] = useState("");
    const [prodImg, setProdImg] = useState(undefined);

    const [topMsg, setTopMsg] = useState(""); 

    const navigate = useNavigate();

    useEffect(() => {
        const db = getDatabase();
        const productRef = dbRef(db, "products/" + productKey.productId);

        onValue(productRef, (snapshot) => {
            let tempObj = {};
            snapshot.forEach((productValue) => {
                const prodKey = productValue.key;
                const productData = productValue.val();
                tempObj[prodKey] = productData;
            });
            setProductObject(tempObj);
            setLoadedProduct(true);
        })
    }, []);

    //sets database keys with values so they can be displayed with other products
    const handleClick = async (event) => {
        event.preventDefault();
        if (price === "" || imageAlt === "" || ratingJustification === "" || tags === "" || category === "" || link === "" || ratingImgAlt === "") {
            setTopMsg("Please fill out all fields!");
        } else {
            firebaseUpdate(productRef, {
                approval: "approved",
                price: price,
                imageAlt: imageAlt,
                ratingJustification: ratingJustification,
                tags: tags,
                category: category,
                link: link,
                ratingImgAlt: ratingImgAlt
            })

            .then(() => {
                handleImageUpload(event);
                navigate('/ApprovalScreen');
            })
            .catch((error) =>{
                <ErrorScreen error={error}/>
            })

        }
    }

    const handleDelete = async (event) => {
        event.preventDefault();
        const approvalSetting = dbRef(db, "products/" + productKey.productId);
            firebaseUpdate(approvalSetting, {approval: "denied"})

            .then(() => {
                navigate('/DenialScreen');
            })

            .catch((error) => {
                <ErrorScreen error={error} />
            })
    }

    const handleChange = (event) => {
        setImageAlt(event.target.value);
    }

    const handleChange2 = (event) => {
        setPrice(event.target.value);
    }

    const handleChange4 = (event) => {
        setRatingJustification(event.target.value);
    }

    const handleChange5 = (event) => {
        setratingImgAlt(event.target.value);
    }

    const handleChange6 = (event) => {
        setTags(event.target.value);
    }

    const handleChange7 = (event) => {
        setCategory(event.target.value);
    }

    const handleChange8 = (event) => {
        setLink(event.target.value);
    }

    const handleChange3 = (event) => {
        if (event.target.files.length > 0 && event.target.files[0]) {
            const imageFile = event.target.files[0];
            setProdImg(imageFile);
            setProductRating(URL.createObjectURL(imageFile));
        }
    }

    const handleImageUpload = async (event) => {
        const storage = getStorage();
        const imgTitle = productRating + ".png"
        const imageRef = ref(storage, imgTitle);
        await uploadBytes(imageRef, prodImg);
        const downloadUrlString = await getDownloadURL(imageRef)
        firebaseUpdate(productRef, {
            productRating: productRating,
            ratingImage: downloadUrlString
        })

        .catch((error) => {
            <ErrorScreen error={error} />
        })
    }

    if(loadedProduct === false) {
        return (
            <div className='no-results'>
                <p className='card-container'>Loading your product!</p>
            </div>
        );
    } else {
        return(
            <main>
                <div className="product-card-container">
                    <div className="product-card">
                        <p className="text-center mt-5">{topMsg}</p>
                        <h2>Approve the Product</h2>
                        <img className="bookmark-search-img" src={productObject.image} alt={productObject.product} />
                        <p className="product-name">{productObject.product}</p>
                        <p className="company">{productObject.company}</p>
                        <form>
                            <label className="label-text" htmlFor="imagealt">Describe the Image: </label><br />
                            <input id="imageAlt" value={imageAlt} type="text" onChange={handleChange} name="imageAlt" /><br /><br />
                            <label className="label-text" htmlFor="price">Set a Price: </label><br />
                            <input id="price" value={price} type="text" onChange={handleChange2} name="price" /><br /><br />
                            <label className="label-text" htmlFor="ratingImage">Upload Rating Photo:</label><br />
                            <input type="file" id="ratingImage" onChange={handleChange3} name="filename" className="btn btn-success label-text" /><br /><br />
                            <label className="label-text" htmlFor="ratingjust">Justify the Rating: </label><br />
                            <input id="ratingjust" value={ratingJustification} type="text" onChange={handleChange4} name="ratinJustification" /><br /><br />
                            <label className="label-text" htmlFor="ratingImgAlt">Write Alt text for product rating: </label><br />
                            <input id="ratingImgAlt" value={ratingImgAlt} type="text" onChange={handleChange5} name="ratingImgAlt" /><br /><br />
                            <label className="label-text" htmlFor="tags">Tags to Search Product by: </label><br />
                            <input id="tags" value={tags} type="text" onChange={handleChange6} name="tags" /><br /><br />
                            <label className="label-text" htmlFor="category">Category of Product: </label><br />
                            <input id="category" value={category} type="text" onChange={handleChange7} name="category" /><br /><br />
                            <label className="label-text" htmlFor="link">Link to Product Details: </label><br />
                            <input id="link" value={link} type="text" onChange={handleChange8} name="link" /><br /><br />
                            <input id="approve" type="submit" value="Approve" className="btn btn-success label-text mb-4" to="/RequestProductReceipt" onClick={handleClick}/>
                            <input id="deny" type="submit" value="Deny" className="deny btn btn-success label-text mb-4" to="/RequestProductReceipt" onClick={handleDelete}/>
                        </form>
                    </div>
                </div>
            </main>
        )
    }
}

export function ApprovalScreen(props) {
    return(
        <h2>You sent in the item for approval! If you look at the browse products list, it will now appear.</h2>
    )
}

export function DenialScreen(props) {
    return(
        <h2>You have denied this item! We have stored this item with an approval of denied, if you want to refer to it at a later date.</h2>
    )
}

export function ErrorScreen(props) {
    return(
        <p>{props.error}</p>
    )
}