import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { StyledFirebaseAuth } from 'react-firebaseui'
import { getAuth, EmailAuthProvider, GoogleAuthProvider, signOut, updateProfile } from 'firebase/auth'
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'

export function SignIn(props) {


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

    if (props.currentUser != null) {
        return <Navigate to="/UserProfile" />
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
        await updateProfile(props.currentUser, { photoURL: downloadUrlString });

    }

    return (
        <div className="signOutBody">
            <form>
                <h2 className="text-center profile-header">Personal Profile</h2>
                <p>You are signed in as {props.currentUser.userName}.</p>
                <img src={imageUrl} alt="user avatar preview" className="w-25 p-3 mb-4"/> <br></br>
                <label htmlFor="imageUploadInput" className="btn btn-success mb-4">Choose Image</label> <br></br>
                <button className="btn btn-success" onClick={handleImageUpload}>Save to Profile</button> <br></br>
                <input type="file" name="image" id="imageUploadInput" className="d-none" onChange={handleChange}/> <br></br>
                <input type="submit" value="Sign Out" className="btn btn-success label-text" onClick={handleClick3} />
            </form>
        </div>
    )
}



