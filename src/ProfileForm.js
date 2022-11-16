import React from 'react';

export function ProfileForm(props) {
    return (
    <div>
        <h2 class="text-center profile-header">Personal Profile</h2>
        <form className="login-info">
            <label className="label-text" for="username">Username:</label><br />
            <input id="username" type="text" name="username" /><br />
            <label className="label-text" for="password">Password:</label><br />
            <input id="password" type="text" name="password" /><br /><br />
            <input type="submit" value="Sign In" className="btn btn-primary label-text" />
        </form>
    </div>
    );
}

export function FootPrintScore(props) {
    <p class="score-label">Your Ecological Footprint Score</p>
}