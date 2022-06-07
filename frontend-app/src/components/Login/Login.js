import React, { useState } from 'react';
import "./Login.css";
import PropTypes from 'prop-types';

// POST to the service in order to get a token
async function loginUser(credentials) {
  return fetch('http://localhost:4000/user/login', {
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
  })
    .catch(err => {
      return undefined;
    });
}


export default function Login({ setToken }) {

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState("");

  // Sets the token after the user logs in
  const handleLogin = async e => {
    e.preventDefault();
    const token = await loginUser({
      name: username,
      password: password
    });
    if (token !== undefined) {
      setToken(token);
    } else {
      setErrors("Name or password are incorrect!")
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleLogin} noValidate>
          <h1>Welcome Back!</h1>
          <div className="form-group">
            <label>Username</label>
            <input 
              type="username" 
              className="form-control" 
              placeholder="Enter username" 
              onChange={e => {
                setUserName(e.target.value);
              }} 
              noValidate/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Enter password" 
              onChange={e => { 
                setPassword(e.target.value); 
              }} 
              noValidate/>
              {errors.length > 0 && 
                <span className='error'>{errors}</span>}
          </div>
          <button type="submit" className="btn btn-primary btn-block submitBtn">Log In</button>
        </form>
      </div>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};