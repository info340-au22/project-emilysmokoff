import React, { useState } from 'react';

export function SignIn(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = (event) => {
        event.preventDefault();
        setUsername(event.target.form.username.value);
        setPassword(event.target.form.password.value);
    }

    let topMsg = "";
    if (username == props.username && password == props.password) {
        topMsg = "You are signed in as " + username + ".";
        //Route to sign out page, passing username as a prop
    } else {
        topMsg = "Please submit your username and password."
    }

    return (
        <div className="signInBody">
            <h2 className="text-center profile-header">Sign In</h2>
            <p className="text-center">{topMsg}</p>
            <form>
                <label className="label-text" for="username">Username:</label><br />
                <input id="username" type="text" name="username"/><br />
                <label className="label-text" for="password">Password:</label><br />
                <input id="password" type="password" name="password" /><br /><br />
                <input type="submit" value="Sign In" className="btn btn-primary label-text mb-4" onClick={handleClick}/>
            </form>
        </div>
    );
}

export function SignOut (props) {
    return (
        <div className="signOutBody">
            <form>
                <h2 className="text-center profile-header">Personal Profile</h2>
                <p>You are signed in as {props.username}.</p>
                <input type="submit" value="Sign Out" className="btn btn-primary label-text mb-4"/>
            </form>
            <span className="footprint"></span>
            <p className="score-label">Your Ecological Footprint Score</p>
        </div>
    )
}

export function CreateAccount (props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    let accountError = "";
    
    const handleClick2 = (event) => {
        event.preventDefault();
        setUsername(event.target.form.username.value);
        setPassword(event.target.form.password.value);
        setPassword2(event.target.form.password2.value);
    }

    if (password == password2) {
        //Route to sign in page, passing username and password as props
    } else {
        accountError = "Your passwords do not match.";
    }

    return (
        <form className="profileBody">
            <p className="text-center">{accountError}</p>
            <h2 className="text-center profile-header">Create an Account</h2>
            <label className="label-text" for="username">Create a Username:</label><br />
            <input id="username" type="text" name="username"/><br />
            <label className="label-text" for="password">Create a Password:</label><br />
            <input id="password" type="password" name="password" /><br />
            <label className="label-text" for="password">Confirm Password:</label><br />
            <input id="password2" type="password" name="password2" /><br /><br />
            <input type="submit" value="Sign In" className="btn btn-primary label-text mb-4" onClick={handleClick2}/> 
        </form>
    )
}


