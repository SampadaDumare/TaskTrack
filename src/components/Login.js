import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { jwtDecode } from 'jwt-decode';
import userContext from '../context/userContext';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const history = useHistory();
    const context = useContext(userContext);
    const {login} = context;

    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        })
        const json = await response.json();
        console.log(json);
        if (json.success) {
            const decoded = jwtDecode(json.authToken);
            const role = decoded.user.role;
            
            login(json.authToken, role, json.user.name);

            alert("Login successful");
            if (role === "admin") {
                history.push("/admin")
            } else if (role === "manager") {
                history.push("/manager")
            } else {
                history.push("/employee")
            }
        } else {
            alert("Login Failed !!")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='container'>
            <form className='my-3' onSubmit={onSubmit}>
                <h2>Login to TaskTrack</h2>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">email</label>
                    <input type="text" id="email" name='email' value={credentials.email} onChange={onChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" id="password" name='password' value={credentials.password} onChange={onChange} className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <Link className="my-3" to="/signup">Create new account</Link>
        </div>
    )
}

export default Login
