import React from 'react'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import roleBased from './images/role-based1.png'
import projectMana from './images/open-folder.png'
import taskTrack from './images/list-check.png';
import security from './images/shield-keyhole.avif'

const Home = () => {
  const history = useHistory();
  return (
    <div
      className="d-flex justify-content-center"
      style={{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems: "center"
      }}
    >
      <div
        style={{
          height: '28vh',
          width: '50vw',
          border: "3px solid green",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          borderRadius: "10px",
          marginTop: "40px"
        }}
      >
        <h2>TaskTrack</h2>
        <p>A full-stack task management system for teams to manage projects and track tasks efficiently.</p>
        <div>
          <button onClick={() => { history.push("/signup") }} className="btn btn-success mx-2">Get Started</button>
          <button onClick={() => { history.push("/login") }} className="btn btn-outline-success mx-2">Login</button>
        </div>
      </div>
      <div style={{display:"flex", justifyContent: "center", alignItems: "center", marginTop:"60px"}}>
        <div className="card mx-3" style={{height:"14rem",width: "15rem", display:"flex",flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
          <img src={roleBased} className="card-img-top" alt="..." style={{height:"80px", width:"80px", marginTop:"10px"}} />
          <div className="card-body">
            <h5 className="card-title">Role-Based Authentication</h5>
            <p className="card-text">Admin & User roles with JWT-based secure login</p>
          </div>
        </div>
        <div className="card mx-3" style={{height:"14rem",width: "15rem", display:"flex",flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
          <img src={projectMana} className="card-img-top" alt="..." style={{height:"80px", width:"80px"}} />
          <div className="card-body">
            <h5 className="card-title">Prject Management</h5>
            <p className="card-text">Create, manage and organize projects</p>
          </div>
        </div>
        <div className="card mx-3" style={{height:"14rem",width: "15rem", display:"flex",flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
          <img src={taskTrack} className="card-img-top" alt="..." style={{height:"80px", width:"80px", marginTop:"12px"}} />
          <div className="card-body">
            <h5 className="card-title">Task Tracking</h5>
            <p className="card-text">Assign and track tasks within projects</p>
          </div>
        </div>
        <div className="card mx-3" style={{height:"14rem",width: "15rem", display:"flex",flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
          <img src={security} className="card-img-top" alt="..." style={{height:"80px", width:"80px"}} />
          <div className="card-body">
            <h5 className="card-title">Secure Authentication</h5>
            <p className="card-text">JWT-based authentication for secure access</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
