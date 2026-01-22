import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { jwtDecode } from 'jwt-decode';
import userContext from '../context/userContext';

const Signup = () => {
    const [credentials, setCredentials] = useState({ name: "", email: "", role: "", password: "", cpassword: "" });
    const history = useHistory();
    const context = useContext(userContext);
    const {login} = context;

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(credentials);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, role: credentials.role, password: credentials.password })
        })

        const json = await response.json();
        console.log(json);
        if (json.success) {

            // Decode authToken to get the role 
            const decoded = jwtDecode(json.authToken);
            const role = decoded.user.role;
           
            login(json.authToken, role, json.user.name);

            alert("Signup successful");
            if (role === "admin") {
                history.push("/admin")
            } else if (role === "manager") {
                history.push("/manager")
            } else {
                history.push("/employee")
            }
        } else {
            alert("Signup Failed !!");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form className='container my-3' onSubmit={onSubmit} autoComplete="off">

                <h2>Signup to TaskTrack</h2>
                <div className="my-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" id="name" name='name' value={credentials.name} onChange={onChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">email</label>
                    <input type="text" id="email" name='email' value={credentials.email} onChange={onChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">Role</label>
                    <select id="role" name='role' onChange={onChange} className="form-select">
                        <option value="">Select Role</option>
                        <option value={"admin"}>Admin</option>
                        <option value={"manager"}>Manager</option>
                        <option value={"employee"}>Employee</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" id="password" name='password' value={credentials.password} onChange={onChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" id="cpassword" name='cpassword' value={credentials.cpassword} onChange={onChange} className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>

            </form>
        </div>
    )
}

export default Signup
