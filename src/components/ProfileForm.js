import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { StyledFirebaseAuth } from 'react-firebaseui'
import { getAuth, EmailAuthProvider, GoogleAuthProvider, signOut, updateProfile } from 'firebase/auth'
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { getDatabase, set as firebaseSet, ref as dbRef } from 'firebase/database'

export function SignIn(props) {

    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    // // const username = "";
    // // const password = ""
    // const [newUsername, setNewUsername] = useState('x');
    // const [newPassword, setNewPassword] = useState('x');

    // useEffect(() => {

    //     const db = getDatabase();
    //     const usernameRef = dbRef(db, "newUsername");
    //     const passwordRef = dbRef(db, "newPassword");

    //     onValue(usernameRef, (snapshot) => {
    //         const newValue = snapshot.val();
    //         setNewUsername([newValue]);
    //     });

    //     onValue(passwordRef, (snapshot) => {
    //         const newValue = snapshot.val();
    //         setNewPassword([newValue]);
    //     });

    // }, [])

    // const handleClick = (event) => {
    //     event.preventDefault();
    //     setUsername(event.target.form.username.value);
    //     setPassword(event.target.form.password.value);
    // }

    // const handleClick4 = (event) => {
    //     navigate("/CreateAccount");
    // }

    // let topMsg = "";


    // if (username == newUsername && password == newPassword) {
    //     //topMsg = "You are signed in as " + username + ".";
    //     //Route to sign out page, passing username as a prop
    //     //<SignOut username = {username} />
    //     navigate("/SignOut");
    // } else {
    //     topMsg = "Please submit your username and password."
    // }

    // return (
    //     <div className="profileBody">
    //         <h2 className="text-center profile-header">Sign In</h2>
    //         <p className="text-center">{topMsg}</p>
    //         <form>
    //             <label className="label-text" htmlFor="username">Username:</label><br />
    //             <input id="username" type="text" name="username"/><br />
    //             <label className="label-text" htmlFor="password">Password:</label><br />
    //             <input id="password" type="password" name="password" /><br /><br />
    //             <input type="submit" value="Sign In" className="btn btn-primary label-text mb-4" onClick={handleClick}/><br></br>
    //             <input type="submit" value="Create Account" className="btn btn-primary label-text mb-4" onClick={handleClick4}/>
    //         </form>
    //     </div>
    // );

    const auth = getAuth();

    const configObj = {
        signInOptions: [
            {
                provider: EmailAuthProvider.PROVIDER_ID,
                requireDisplayName: true
            },
            {
                provider: GoogleAuthProvider.PROVIDER_ID
            }
        ],
        signInFlow: 'popup',
        callbacks: {
            signInSuccessWithAuthResult: () => false
        },
        credentialHelper: 'none'
    }

    // let userId = null;
    if (props.currentUser != null) {
        // userId = props.currentUser.userId;
        // if (props.currentUser.userId || props.currentUser.userId == "Log Out") {
            return <Navigate to="/UserProfile" />
//        }
    
    }

    
    return (
        <div>
            <h2 className="text-center profile-header">Sign In</h2>
            {!props.user &&
                <StyledFirebaseAuth firebaseAuth={auth} uiConfig={configObj} />
            }
        </div>
    )
}

export function UserProfile (props) {
    const navigate = useNavigate();
    const [profileImg, setprofileImg] = useState(undefined);
    let initialURL = props.currentUser.userImg;
    const [imageUrl, setImageUrl] = useState(initialURL)
    //const [newUsername, setNewUsername] = useState('');

    // useEffect(() => {

    //     const db = getDatabase();
    //     const usernameRef = dbRef(db, "newUsername");

    //     onValue(usernameRef, (snapshot) => {
    //         const newValue = snapshot.val();
    //         setNewUsername([newValue]);
    //     });

    // }, [])


    const handleClick3 = async (event) => {
        await signOut(getAuth());
        navigate("/SignIn");
    }

    const handleChange = (event) => {
        if(event.target.files.length > 0 && event.target.files[0]) {
          const profileImg = event.target.files[0]
          setprofileImg(profileImg);
          setImageUrl(URL.createObjectURL(profileImg));
        }
    }

    const handleImageUpload = async (event) => {
        event.preventDefault();
        const storage = getStorage();
        const imageRef = storageRef(storage, "userImages/" +props.currentUser.userId+".png");
        await uploadBytes(imageRef, profileImg);
        const downloadUrlString = await getDownloadURL(imageRef);
        //console.log(downloadUrlString);
        await updateProfile(props.currentUser, { photoURL: downloadUrlString });

        // const db = getDatabase();
        // const userImgRef = dbRef(db, "userData/" + props.currentUser.userId + "/imgUrl");
        // firebaseSet(userImgRef, downloadUrlString)
    }

    return (
        <div className="signOutBody">
            <form>
                <h2 className="text-center profile-header">Personal Profile</h2>
                <p>You are signed in as {props.currentUser.userName}.</p>
                {console.log(imageUrl)}
                <img src={imageUrl} alt="user avatar preview" className="mb-4"/> <br></br>
                <label htmlFor="imageUploadInput" className="btn btn-success mb-4">Choose Image</label> <br></br>
                <button className="btn btn-success" onClick={handleImageUpload}>Save to Profile</button> <br></br>
                <input type="file" name="image" id="imageUploadInput" className="d-none" onChange={handleChange}/> <br></br>
                <input type="submit" value="Sign Out" className="btn btn-success label-text" onClick={handleClick3} />
            </form>
        </div>
    )
}

// export function CreateAccount (props) {

//     const db = getDatabase();
//     const navigate = useNavigate();

//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [password2, setPassword2] = useState('');
//     let accountError = "";
    
//     const handleClick2 = (event) => {
//         event.preventDefault();
//         setUsername(event.target.form.username.value);
//         setPassword(event.target.form.password.value);
//         setPassword2(event.target.form.password2.value);
//     }

//     // const handleClick = (event) => {
//     //     event.preventDefault();
        
//     //     navigate("/SignIn");
//     // }

//     if (password == password2) {
//         //Route to sign in page, passing username and password as props
//         //<SignIn username={username} password = {password} />
//         const usernameRef = dbRef(db, "newUsername");
//         firebaseSet(usernameRef, username);
//         const passwordRef = dbRef(db, "newPassword");
//         firebaseSet(passwordRef, password);
//         navigate("/SignIn");
//     } else {
//         accountError = "Your passwords do not match.";
//     }

//     return (
//         <form className="profileBody">
//             <p className="text-center">{accountError}</p>
//             <h2 className="text-center profile-header">Create an Account</h2>
//             <label className="label-text" htmlFor="username">Create a Username:</label><br />
//             <input id="username" type="text" name="username"/><br />
//             <label className="label-text" htmlFor="password">Create a Password:</label><br />
//             <input id="password" type="password" name="password" /><br />
//             <label className="label-text" htmlFor="password">Confirm Password:</label><br />
//             <input id="password2" type="password" name="password2" /><br /><br />
//             <input type="submit" value="Create Account" className="btn btn-primary label-text mb-4" onClick={handleClick2}/> 
//             {/* <input type="submit" value="Sign In" className="btn btn-primary label-text mb-4" onClick={handleClick}/><br></br> */}
//         </form>
//     )
// }


