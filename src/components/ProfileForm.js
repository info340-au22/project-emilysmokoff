import React, { useState } from 'react';

export function ProfileForm(props) {

    const [username, setUsername] = useState('');

    const handleClick = (event) => {
        event.preventDefault();
        setUsername(event.target.form.username.value);
    }

    let signIn = "";
    if (username != "") {
        signIn = "You are signed in as " + username + ".";
        <SignOut username = {username} />
    }

    return (
        <div className="profileBody">
            <p className="text-center">{signIn}</p>
            <h2 className="text-center profile-header">Personal Profile</h2>
            <form>
                <label className="label-text" for="username">Username:</label><br />
                <input id="username" type="text" name="username"/><br />
                <label className="label-text" for="password">Password:</label><br />
                <input id="password" type="password" name="password" /><br /><br />
                <input type="submit" value="Sign In" className="btn btn-primary label-text mb-4" onClick={handleClick}/>
            </form>
            <span className="footprint"></span>
            <p className="score-label">Your Ecological Footprint Score</p>
        </div>
    );
}

export function SignOut (props) {
    return (
        <form className="profileBody">
            <p>You are signed in as {props.username}.</p>
            <input type="submit" value="Sign Out" className="btn btn-primary label-text mb-4"/>
        </form>
    )
}


