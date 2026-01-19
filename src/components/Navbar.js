import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const Navbar = () => {
    const history = useHistory();
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        history.push("/login");
    }
    const role = localStorage.getItem("role");

let homeRoute = "/";
if (role === "admin") homeRoute = "/admin";
if (role === "manager") homeRoute = "/manager";
if (role === "employee") homeRoute = "/employee";

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">TaskTrack</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to={homeRoute}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem("token") ?
                            <form className="d-flex" role="search">
                                <Link className="btn btn-outline-success mx-1" to='/login' type="submit">Login</Link>
                                <Link className="btn btn-outline-success mx-1" to='/signup' type="submit">Signup</Link>
                            </form> : <button className="btn btn-outline-success" onClick={handleLogout}>Logout</button>
                        }

                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
