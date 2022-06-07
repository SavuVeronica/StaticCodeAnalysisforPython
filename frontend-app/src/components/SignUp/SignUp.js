import React, { useState } from 'react';
import "./SignUp.css";
import PropTypes from 'prop-types';

// POST to the service in order to get a token
async function signUpUser(credentials) {
    return fetch('http://localhost:4000/user/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
        throw new Error('Something went wrong');
    }).catch(err => {
        return undefined;
    });
}

export default function SignUp({ setToken }) {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [nameError, setNameError] = useState("");
    const [pswError, setPswError] = useState("");

    // Sets the token after the user created an account
    const handleSignUp = async e => {
        e.preventDefault();
        const token = await signUpUser({
            name: username,
            password: password
        });
        if (token !== undefined) {
            setToken(token.id);
        } else {
            setNameError("An user with this name already exists!")
        }
    };

    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;

        switch(name){
            case 'username':
                setNameError(value.length < 5 ? "Name must be at least 5 characters!" : "");
                break;
            case 'password':
                setPswError(value.length < 8 ? "Password must be at least 8 characters!" : "");
                break;
            default:
                break;
        }
    }    

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form onSubmit={handleSignUp} noValidate>
                    <h1>Sign Up</h1>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            className="form-control"
                            placeholder="Username"
                            onChange={e => {
                                setUserName(e.target.value);
                                handleChange(e);
                            }}
                            noValidate />
                        {nameError.length > 0 &&
                            <span className='error'>{nameError}</span>}
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Enter password"
                            onChange={e => {
                                setPassword(e.target.value);
                                handleChange(e);
                            }}
                            noValidate />
                        {pswError.length > 0 &&
                            <span className='error'>{pswError}</span>}
                    </div>
                    <button type="submit" className="btn btn-primary btn-block submitBtn">Sign Up</button>
                    <p className="forgot-password text-right">
                        Already registered <a href="login">sign in?</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

SignUp.propTypes = {
    setToken: PropTypes.func.isRequired
};