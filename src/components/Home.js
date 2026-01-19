import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const Home = () => {
  return (
    <div 
      className="d-flex justify-content-center align-items-center" 
      style={{ height: "80vh" }}
    >
      <div 
        style={{ 
          height: '30vh', 
          width: '50vw', 
          border: "3px solid green",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          borderRadius: "10px"
        }}
      >
        <h2>TaskTrack</h2>
        <p>India's Most Trusted Site to Track Your Companies Work</p>
        <p><Link to="/login">Login</Link></p>
        <p><Link to="/signup">Signup</Link></p>
      </div>
    </div>
  )
}

export default Home
