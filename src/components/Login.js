import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
    const [credentials, setCredentials] = useState({email:"", password:""});
    const history = useHistory();

    const onSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:4000/api/auth/login", {
            method: "POST", 
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email:credentials.email, password: credentials.password})
        })
        const json = await response.json();
        console.log(json);
        if(json.success){
            //save authtoken to localhost 
            localStorage.setItem("token", json.authToken);
            localStorage.setItem("username", json.user.name);

            // Decode authToken to get the role 
            const decoded = jwtDecode(json.authToken);
            const role = decoded.user.role;
            // const name = decoded.user.name;
            localStorage.setItem("role", role);
            // localStorage.setItem("name", name);

            alert("Login successful");
            if(role === "admin"){
                history.push("/admin")
            } else if (role === "manager"){
                history.push("/manager")
            } else{
                history.push("/employee")
            }
        }else{
            alert("Login Failed !!")
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name] : e.target.value})
    }
    
  return (
    <div>
            <form className='container' onSubmit={onSubmit}>
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
        </div>
  )
}

export default Login
